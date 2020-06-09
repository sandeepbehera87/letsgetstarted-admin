import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LoginState } from './reducer';

export const getLoginState = createFeatureSelector<LoginState>('login');

export const getTokenState = createSelector(
  getLoginState,
  (state: LoginState) => (state.LoginData ? state.LoginData.token : undefined)
);
