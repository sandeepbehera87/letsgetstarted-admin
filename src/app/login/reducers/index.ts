import * as LoginAction from '../login.actions';
import * as fromRoot from '../../state/app-state';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const loginFeatureKey = 'login';

export interface LoginState {
  token: string,
  success: boolean,
  error: string
}

export const initialLoginState: LoginState = {
  token: undefined,
  success: false,
  error: ''
};

export interface AppState extends fromRoot.AppState {
  token : string
}

export function loginReducer(state = initialLoginState, action: LoginAction.LoginActions) {
  switch(action.type) {
    case LoginAction.LoginActionTypes.USER_LOGIN : {
      return {
        ...state,
      }
    }
    case LoginAction.LoginActionTypes.USER_LOGIN_SUCCESS : {
      return {
        ...state,
        token: action.payload.token,
        success: true
      }
    }
    case LoginAction.LoginActionTypes.USER_LOGIN_FAIL : {
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

export const getLoginFeatureState = createFeatureSelector<LoginState> (
  'login'
); 

export const getToken = createSelector(
  getLoginFeatureState,
  (state: LoginState) => state.token
);