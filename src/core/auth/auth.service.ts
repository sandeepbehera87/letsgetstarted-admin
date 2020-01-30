import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ErrorHandlerService} from '../http-error-handling/error-handler.service';

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
    return this.httpClient
      .post<any>(this.userSignUpApi, JSON.stringify(userData))
      .pipe(
        map(response => response),
        tap(
          response => response,
          error => this.errorHandler.handleError(error),
        ),
      );
  }

  signIn(signInData): Observable<any> {
    console.log('signIn');
    return this.httpClient
      .post<any>(this.userSignInApi, JSON.stringify(signInData))
      .pipe(
        map(response => response),
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
