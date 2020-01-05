import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { ErrorHandlerService } from "../http-error-handling/error-handler.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  userSignUpApi = "api/user/register";
  userSignInApi = "api/user/login";
  // userSignOutApi = 'api/user/logout';

  constructor(
    private errorHandler: ErrorHandlerService,
    private httpClient: HttpClient
  ) {}

  userRegistration(userData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.httpClient
      .post<any>(this.userSignUpApi, JSON.stringify(userData), httpOptions)
      .pipe(
        map(response => response),
        tap(
          response => response,
          error => {
            this.errorHandler.handleError(error);
          }
        )
      );
  }

  signIn(signInData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.httpClient
      .post<any>(this.userSignInApi, JSON.stringify(signInData), httpOptions)
      .pipe(
        map(response => response),
        tap(
          response => response,
          error => {
            this.errorHandler.handleError(error);
          }
        )
      );
  }

  signOut() {
    return null;
  }
}
