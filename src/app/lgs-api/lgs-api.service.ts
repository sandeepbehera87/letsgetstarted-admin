import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, map, Observable, switchMap, take, throwError } from 'rxjs';
import * as Crypto from 'crypto-js';
import { environment } from '../../environments/environment';
import { LgsApiConfig } from './lgs-api-conf';
import { resolveApiUrl } from './lgs-api-url';
import { Store } from '@ngrx/store';
import { getToken } from '../lgs-state/lgs.selector';
import { QuestionSet } from '../lgs-interface';

@Injectable({
  providedIn: 'root',
})
export class LgsApiService {
  constructor(
    private httpClient: HttpClient,
    private store: Store,
    private spinner: NgxSpinnerService,
  ) {}

  private apiUrl(path: string): string {
    return resolveApiUrl(path);
  }

  private createBaseHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  private withSpinner<T>(request$: Observable<T>): Observable<T> {
    this.spinner.show();
    return request$.pipe(
      catchError((error) => throwError(() => error)),
      finalize(() => this.spinner.hide()),
    );
  }

  userRegistration(userData: any): Observable<any> {
    const data = Crypto.AES.encrypt(
      JSON.stringify(userData),
      environment.secret_key,
    ).toString();

    return this.withSpinner(
      this.httpClient.post(
        this.apiUrl(LgsApiConfig.SIGNUP.PATH),
        JSON.stringify({ registrationData: data }),
        { headers: this.createBaseHeader() },
      ),
    );
  }

  signIn(signInData: any): Observable<any> {
    const data = Crypto.AES.encrypt(
      JSON.stringify({
        userId: signInData.userId,
        password: signInData.password,
      }),
      environment.secret_key,
    ).toString();

    return this.withSpinner(
      this.httpClient
        .post(this.apiUrl(LgsApiConfig.SIGNIN.PATH), JSON.stringify({ userData: data }), {
          headers: this.createBaseHeader(),
          responseType: 'text',
        })
        .pipe(
          map((response) => {
            const bytes = Crypto.AES.decrypt(response, environment.secret_key);
            const decrypted = bytes.toString(Crypto.enc.Utf8);
            if (!decrypted) {
              throw {
                status: 400,
                error: { error: 'Login failed. Please check your credentials.' },
              };
            }
            return JSON.parse(decrypted);
          }),
        ),
    );
  }

  signOut(): Observable<any> {
    return this.withSpinner(
      this.store.select(getToken).pipe(
        take(1),
        switchMap((token) =>
          this.httpClient.post(
            this.apiUrl(LgsApiConfig.SIGNOUT.PATH),
            {},
            {
              headers: this.createBaseHeader().append('token', token),
            },
          ),
        ),
      ),
    );
  }

  saveQuestion(dataArry: any): Observable<any> {
    const data = Crypto.AES.encrypt(
      JSON.stringify(dataArry),
      environment.secret_key,
    ).toString();

    return this.withSpinner(
      this.store.select(getToken).pipe(
        take(1),
        switchMap((token) =>
          this.httpClient.post(
            this.apiUrl(LgsApiConfig.SAVE_QUESTION.PATH),
            JSON.stringify({ data }),
            {
              headers: this.createBaseHeader().append('token', token),
            },
          ),
        ),
      ),
    );
  }

  getQueations(): Observable<QuestionSet[]> {
    return this.withSpinner(
      this.store.select(getToken).pipe(
        take(1),
        switchMap((token) =>
          this.httpClient
            .get(this.apiUrl(LgsApiConfig.GET_QUESTIONS.PATH), {
              headers: this.createBaseHeader().append('token', token),
              responseType: 'text',
            })
            .pipe(
              map((response) => {
                const bytes = Crypto.AES.decrypt(response.toString(), environment.secret_key);
                const decryptedData = JSON.parse(bytes.toString(Crypto.enc.Utf8));
                return this.normalizeQuestionSets(decryptedData);
              }),
            ),
        ),
      ),
    );
  }

  updateQuestion(id: string, data: QuestionSet): Observable<any> {
    const encrypted = Crypto.AES.encrypt(
      JSON.stringify(data),
      environment.secret_key,
    ).toString();

    return this.withSpinner(
      this.store.select(getToken).pipe(
        take(1),
        switchMap((token) =>
          this.httpClient.put(
            this.apiUrl(`${LgsApiConfig.UPDATE_QUESTION.PATH}/${id}`),
            JSON.stringify({ data: encrypted }),
            {
              headers: this.createBaseHeader().append('token', token),
            },
          ),
        ),
      ),
    );
  }

  deleteQuestion(id: string): Observable<any> {
    if (!id) {
      return throwError(() => new Error('Missing id for deleteQuestion'));
    }
    return this.withSpinner(
      this.store.select(getToken).pipe(
        take(1),
        switchMap((token) =>
          this.httpClient.delete(
            this.apiUrl(`${LgsApiConfig.DELETE_QUESTION.PATH}/${id}`),
            {
              headers: this.createBaseHeader().append('token', token),
            },
          ),
        ),
      ),
    );
  }

  private normalizeQuestionSets(data: QuestionSet[]): QuestionSet[] {
    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((item) => ({
      ...item,
      _id: this.normalizeId(item._id),
    }));
  }

  private normalizeId(id: unknown): string | undefined {
    if (!id) {
      return undefined;
    }
    if (typeof id === 'string') {
      return id;
    }
    if (typeof id === 'object' && id !== null && '$oid' in id) {
      return String((id as { $oid: string }).$oid);
    }
    return String(id);
  }
}