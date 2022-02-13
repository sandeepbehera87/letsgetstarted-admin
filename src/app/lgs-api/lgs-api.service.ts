import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import * as Crypto from 'crypto-js';
import { environment } from '../../environments/environment';
import { LgsApiConfig } from './lgs-api-conf';

@Injectable({
  providedIn: 'root'
})
export class LgsApiService {

  constructor(private httpClient: HttpClient) { }

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
    const config = LgsApiConfig.SIGNIN;
    const data = Crypto.AES.encrypt(
      JSON.stringify({
        email: signInData.email,
        password: signInData.password,
      }),
      environment.secret_key
    ).toString();
    return this.httpClient
      .post<any>(config.PATH, JSON.stringify({ userData: data }))
      .pipe(
        map((response) => {
          const bytes = Crypto.AES.decrypt(response, environment.secret_key);
          const decryptedData = JSON.parse(bytes.toString(Crypto.enc.Utf8));
          return decryptedData;
        }),
        tap(
          (response) => response,
          (error) => {
            throw(error)
          }
        )
      );
  }

  saveQuestion(dataArry: any): Observable<any> {
    const config = LgsApiConfig.SAVE_QUESTION;
    const data = Crypto.AES.encrypt(
      JSON.stringify(dataArry),
      environment.secret_key,
    ).toString();
    return this.httpClient
      .post<any>(config.PATH, JSON.stringify({data}))
      .pipe(
        tap(
          response => response,
          error => console.log(error),
        ),
      );
  }

  getQueations(): Observable<any> {
    const config = LgsApiConfig.GET_QUESTIONS;
    return this.httpClient.get(config.PATH).pipe(
      map(response => {
        const bytes = Crypto.AES.decrypt(response.toString(), environment.secret_key);
        const decryptedData = JSON.parse(bytes.toString(Crypto.enc.Utf8));
        return decryptedData;
      }),
      tap(
        response => response,
        (error) => {
          throw(error)
        }
      ),
    );
  }
}
