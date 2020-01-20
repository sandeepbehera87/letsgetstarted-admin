import {createAction, props} from '@ngrx/store';

export const login = createAction(
  '[Login page] User Login',
  props<{token: string}>(),
);
