import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, switchMap, tap } from 'rxjs';
import * as Crypto from 'crypto-js';
import { environment } from '../../environments/environment';
import { LgsApiConfig } from './lgs-api-conf';
import { Store } from '@ngrx/store';
import { getToken } from '../lgs-state/lgs.selector';
import { QuestionSet } from '../lgs-interface';

@Injectable({
  providedIn: 'root'
})
export class LgsApiService {

  constructor(private httpClient: HttpClient, private store: Store) { }

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
    const config = LgsApiConfig.SIGNUP;
    const data = Crypto.AES.encrypt(
      JSON.stringify(userData),
      environment.secret_key
    ).toString();
    return this.httpClient
      .post<any>(config.PATH, JSON.stringify({ registrationData: data }))
      .pipe(
        map((response) => response),
        tap(
          (response) => response,
          (error) => console.log(error)
        )
      );
  }

  signIn(signInData: any): Observable<any> {
    const requestOptions = {
      headers: this.createBaseHeader(),
    };
    const config = LgsApiConfig.SIGNIN;
    const data = Crypto.AES.encrypt(
      JSON.stringify({
        email: signInData.email,
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
          (response) => response,
          (error) => {
            throw (error)
          }
        )
      );
  }

  saveQuestion(dataArry: any): Observable<any> {
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
              response => response,
              error => console.log(error),
            ),
          )
      })
    );
  }

  getQueations(): Observable<QuestionSet[]> {
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
            response => response,
            (error) => {
              throw (error)
            }
          ),
        );
      })
    );
  }
}
