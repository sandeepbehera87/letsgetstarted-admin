import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as Crypto from 'crypto-js';
import {AppSettings} from '../utils/app.settings';
import {ErrorHandlerService} from '../http-error-handling/error-handler.service';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSignUpApi = 'api/user/register';
  userSignInApi = 'api/user/login';
  userSignOutApi = 'api/user/logout';

  constructor(
    private errorHandler: ErrorHandlerService,
    private httpClient: HttpClient,
  ) {}

  userRegistration(userData): Observable<any> {
    const data = Crypto.AES.encrypt(
      JSON.stringify(userData),
      environment.secret_key,
    ).toString();
    return this.httpClient
      .post<any>(this.userSignUpApi, JSON.stringify({registrationData: data}))
      .pipe(
        map(response => response),
        tap(
          response => response,
          error => this.errorHandler.handleError(error),
        ),
      );
  }

  signIn(signInData): Observable<any> {
    const data = Crypto.AES.encrypt(
      JSON.stringify(signInData),
      environment.secret_key,
    ).toString();
    console.log(data);
    return this.httpClient
      .post<any>(this.userSignInApi, JSON.stringify({userData: data}))
      .pipe(
        map(response => {
          const bytes = Crypto.AES.decrypt(response, environment.secret_key);
          const decryptedData = JSON.parse(bytes.toString(Crypto.enc.Utf8));
          return decryptedData;
        }),
        tap(
          response => response,
          error => this.errorHandler.handleError(error),
        ),
      );
  }

  signOut(): Observable<any> {
    return this.httpClient.post<any>(this.userSignOutApi, {}).pipe(
      tap(
        response => response,
        error => this.errorHandler.handleError(error),
      ),
    );
  }
}
