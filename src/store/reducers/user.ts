import * as actionTypes from "../actionTypes";
import updateObject from "../util/updateObject";
const initialUserState = {
  permissions: [],
};
export const userReducer = (
  initialState: userState = initialUserState,
  action: userAction
) => {
  switch (action.type) {
    case actionTypes.GET_PERMISSIONS:
      return updateObject(initialState, action.user);
    case actionTypes.LOGOUT:
      const resetedState = { permissions: [] };
      return updateObject(initialState, resetedState);
    default:
      return initialState;
  }
};
