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

export const loginReducer = createReducer(
  initialLoginState,
  on(LoginAction.login, (state, action) => {
    return {
      token: action.token,
    };
  }),
);
