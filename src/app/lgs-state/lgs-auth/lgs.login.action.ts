
import { Action, createAction, createReducer, on, props } from '@ngrx/store';

export interface User {
    token: string;
    userId: string;
}
export const loginSuccess = createAction(
  '[Login Success] Login success',
  props<{ payload: User; }>()
);


export const loginReducer = createReducer(
  null as any,
  on(
      loginSuccess,
      (state: User, { payload }) => ({...state, ...payload})
  )
);

export function lgsLoginReducer(
    state: User,
    action: Action
) {
    return loginReducer(state, action);
}