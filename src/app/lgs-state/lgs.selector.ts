import { createFeatureSelector, createSelector } from "@ngrx/store";

import { AppState } from './lgs-state.interface';

export const getAppState = createFeatureSelector<AppState>('lgs-app-state');

export const getToken = createSelector(
    getAppState,
    (state: AppState) => state.user?.token
)

export const getUserid = createSelector(
    getAppState,
    (state: AppState) => state.user?.userId
)
