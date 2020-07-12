import { Action } from '@ngrx/store';
import { LoginData, LoginUserData } from './login.interface';

export enum LoginActionTypes {
  USER_LOGIN = '[Login page] User Login',
  USER_LOGIN_SUCCESS = '[Login page] User Login Success',
  USER_LOGIN_FAIL = '[Login page] User Login Fail'
}

export class Login implements Action {
  readonly type = LoginActionTypes.USER_LOGIN;
  constructor(public payload: LoginUserData) {}
}

export class LoginSucess implements Action {
  readonly type = LoginActionTypes.USER_LOGIN_SUCCESS;
  constructor(public payload: LoginData) {}
}

export class LoginFail implements Action {
  readonly type = LoginActionTypes.USER_LOGIN_FAIL;
  constructor(public payload: any){}
}

export type LoginActions = Login | LoginSucess | LoginFail;
