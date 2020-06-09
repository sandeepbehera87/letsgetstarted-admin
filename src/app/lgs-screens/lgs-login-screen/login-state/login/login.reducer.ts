
import { LoginData } from './login.interface';
import * as la from './login.action';

export function loginReducer(
  state: LoginData = null,
  action: la.LoginActions
) {
  switch(action.type) {
    case la.LoginActionTypes.USER_LOGIN : {
      return {
        ...state,
      }
    }
    case la.LoginActionTypes.USER_LOGIN_SUCCESS : {
      return {
        ...state,
        token: action.payload.token,
        success: true
      }
    }
    case la.LoginActionTypes.USER_LOGIN_FAIL : {
      return {
        ...state,
        success: false,
        error: 'Login failed'
      }
    }
    default: {
      return state;
    }
  }
}
