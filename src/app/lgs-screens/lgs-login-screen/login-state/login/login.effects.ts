import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { AuthService } from '../../../../lgs-core/lgs-auth-service/auth.service';
import * as LoginAction from './login.action';

@Injectable()
export class LoginEffects {
  constructor(private action$: Actions, private authService: AuthService) {}

  @Effect()
  postLogin$: Observable<Action> = this.action$.pipe(
    ofType<LoginAction.Login>(LoginAction.LoginActionTypes.USER_LOGIN),
    switchMap((action) => {
      return this.authService.signIn(action.payload).pipe(
        map((response) => new LoginAction.LoginSucess({
          token: response.token,
          success: true
        })),
        catchError((err) => of(new LoginAction.LoginFail(err)))
      );
    })
  );
}
