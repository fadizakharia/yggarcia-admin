import * as actionTypes from "../actionTypes";

export const getPermissions = (args: { permissions: string[] }) => {
  return {
    type: actionTypes.GET_PERMISSIONS,
    user: {
      permissions: args.permissions,
    },
  } as userAction;
};
