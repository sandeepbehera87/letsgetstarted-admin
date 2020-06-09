import { Action } from '@ngrx/store';

export enum AppActionTypes {
  CLEAR_STATE = '[App] Clear state',
};

export class ClearState implements Action {
  readonly type = AppActionTypes.CLEAR_STATE;
}

export type AppActions = ClearState;
