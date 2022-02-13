
import { Action, createAction, createReducer, on, props } from '@ngrx/store';

export interface Token {
    token: string;
}
export const loginSuccess = createAction(
  '[Login Success] Login success',
  props<{ payload: string; }>()
);


export const loginReducer = createReducer(
  null as any,
  on(
      loginSuccess,
      (state: string, { payload }) => payload
  )
);

export function lgsLoginReducer(
    state: string,
    action: Action
) {
    return loginReducer(state, action);
}