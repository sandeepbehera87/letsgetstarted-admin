import { loginReducer } from './login/login.reducer';
import { LoginData } from './login';

export const loginFeatureKey = 'login';

export interface LoginState {
  LoginData: LoginData;
};

export const reducers = {
  LoginData: loginReducer
};
