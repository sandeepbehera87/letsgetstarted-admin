import { MetaReducer, ActionReducerMap } from '@ngrx/store';
import { clearState } from './app.reducer';

export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {};

export const appMetaReducers: MetaReducer<AppState>[] = [clearState];
