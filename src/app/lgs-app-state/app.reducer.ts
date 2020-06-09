import * as AppAction from './app.actions';

export function clearState(reducer) {
  return ((state, action) => {
    if (action.type === AppAction.AppActionTypes.CLEAR_STATE) {
      state = undefined;
    }
    return reducer(state, action);
  });
}
