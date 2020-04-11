import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map, tap, mergeMap, catchError, switchMap } from "rxjs/operators";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { AuthService } from "../../core/auth/auth.service";
import * as LoginAction from "./login.actions";

@Injectable()
export class LoginEffects {
  constructor(private action$: Actions, private authService: AuthService) {}

  @Effect()
  postLogin$: Observable<Action> = this.action$.pipe(
    ofType<LoginAction.Login>(LoginAction.LoginActionTypes.USER_LOGIN),
    switchMap((action) => {
      return this.authService.signIn(action.payload).pipe(
        map((response) => new LoginAction.LoginSucess({token: response.token})),
        catchError((err) => of(new LoginAction.LoginFail(err)))
      );
    })
  );
}
