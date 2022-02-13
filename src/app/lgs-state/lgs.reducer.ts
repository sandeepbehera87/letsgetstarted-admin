import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { lgsLoginReducer, Token } from "./lgs-auth/lgs.login.action";


export const reducers = {
    token: lgsLoginReducer
};

export const appMetaReducers = [];