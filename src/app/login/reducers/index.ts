import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import {LoginAction} from '../action.types';

export const loginFeatureKey = 'login';

export interface LoginState {
  token: string;
}

export const initialLoginState: LoginState = {
  token: undefined,
};

const _loginReducer = createReducer(
  initialLoginState,
  on(LoginAction.login, (state, action) => {
    return {
      token: action.token,
    };
  }),
);

export function loginReducer(state, action) {
  return _loginReducer(state, action);
}
