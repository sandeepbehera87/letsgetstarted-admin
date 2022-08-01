import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, Observable, switchMap, tap } from 'rxjs';
import * as Crypto from 'crypto-js';
import { environment } from '../../environments/environment';
import { LgsApiConfig } from './lgs-api-conf';
import { Store } from '@ngrx/store';
import { getToken } from '../lgs-state/lgs.selector';
import { QuestionSet } from '../lgs-interface';
import { LgsErrorService } from '../lgs-shared/lgs-error-service/lgs-error.service';

@Injectable({
  providedIn: 'root'
})
export class LgsApiService {

  constructor(
    private httpClient: HttpClient,
    private store: Store,
    private spinner: NgxSpinnerService,
    private errorService: LgsErrorService
    ) { }

  createBaseHeader() {
    const headerDict = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':
        'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    };
    return new HttpHeaders(headerDict);
  }

  userRegistration(userData: any): Observable<any> {
    this.spinner.show();
    const requestOptions = {
      headers: this.createBaseHeader(),
    };
    const config = LgsApiConfig.SIGNUP;
    const data = Crypto.AES.encrypt(
      JSON.stringify(userData),
      environment.secret_key
    ).toString();
    return this.httpClient
      .post<any>(config.PATH, JSON.stringify({ registrationData: data }), requestOptions)
      .pipe(
        map((response) => response),
        tap(
          (response) => {
            this.spinner.hide();
            return response;
          },
          (error) => {
            this.spinner.hide();
            return this.errorService.parseErrorResponse(error);
          }
        )
      );
  }

  signIn(signInData: any): Observable<any> {
    this.spinner.show();
    const requestOptions = {
      headers: this.createBaseHeader(),
    };
    const config = LgsApiConfig.SIGNIN;
    const data = Crypto.AES.encrypt(
      JSON.stringify({
        userId: signInData.userId,
        password: signInData.password,
      }),
      environment.secret_key
    ).toString();
    return this.httpClient
      .post<any>(config.PATH, JSON.stringify({ userData: data }), requestOptions)
      .pipe(
        map((response) => {
          const bytes = Crypto.AES.decrypt(response, environment.secret_key);
          const decryptedData = JSON.parse(bytes.toString(Crypto.enc.Utf8));
          return decryptedData;
        }),
        tap(
          (response) => {
            this.spinner.hide();
            return response;
          },
          (error) => {
            this.spinner.hide();
            return this.errorService.parseErrorResponse(error);
          }
        )
      );
  }

  signOut(): Observable<any> {
    this.spinner.show();
    const requestOptions = {
      headers: this.createBaseHeader(),
    };
    const config = LgsApiConfig.SIGNOUT;
    return this.store.select(getToken).pipe(
      switchMap(token => {
        requestOptions.headers = requestOptions.headers.append('token', token);
        return this.httpClient
          .post<any>(config.PATH, {}, requestOptions)
          .pipe(
            tap(
              (response) => {
                this.spinner.hide();
                return response;
              },
              (error) => {
                this.spinner.hide();
                return this.errorService.parseErrorResponse(error);
              }
            ),
          );
        })
      );
  }

  saveQuestion(dataArry: any): Observable<any> {
    this.spinner.show();
    const requestOptions = {
      headers: this.createBaseHeader(),
    };
    const config = LgsApiConfig.SAVE_QUESTION;
    const data = Crypto.AES.encrypt(
      JSON.stringify(dataArry),
      environment.secret_key,
    ).toString();
    return this.store.select(getToken).pipe(
      switchMap(token => {
        requestOptions.headers = requestOptions.headers.append('token', token);
        return this.httpClient
          .post<any>(config.PATH, JSON.stringify({ data }), requestOptions)
          .pipe(
            tap(
              (response) => {
                this.spinner.hide();
                return response;
              },
              (error) => {
                this.spinner.hide();
                return this.errorService.parseErrorResponse(error);
              }
            ),
          );
        })
      );
  }

  getQueations(): Observable<QuestionSet[]> {
    this.spinner.show();
    const requestOptions = {
      headers: this.createBaseHeader(),
    };
    const config = LgsApiConfig.GET_QUESTIONS;
    return this.store.select(getToken).pipe(
      switchMap(token => {
        requestOptions.headers = requestOptions.headers.append('token', token);
        return this.httpClient.get(config.PATH, requestOptions).pipe(
          map(response => {
            const bytes = Crypto.AES.decrypt(response.toString(), environment.secret_key);
            const decryptedData = JSON.parse(bytes.toString(Crypto.enc.Utf8));
            return decryptedData;
          }),
          tap(
            (response) => {
              this.spinner.hide();
              return response;
            },
            (error) => {
              this.spinner.hide();
              return this.errorService.parseErrorResponse(error);
            }
          ),
        );
      })
    );
  }
}
