import { SET_LOADING } from "../actionTypes";
import updateObject from "../util/updateObject";

const loadingInitialState = {
  loading: false,
};
export const LoadingReducer = (
  state = loadingInitialState,
  actions: loadingAction
) => {
  switch (actions.type) {
    case SET_LOADING:
      return updateObject(state, actions.loading);
    default:
      return state;
  }
};
