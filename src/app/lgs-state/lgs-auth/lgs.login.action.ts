
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
  { token: '', userId: '' } as User,
  on(loginSuccess, (_state: User, { payload }) => ({ ...payload })),
);

export function lgsLoginReducer(
    state: User | undefined,
    action: Action
) {
    return loginReducer(state ?? { token: '', userId: '' }, action);
}