import { SET_LOADING } from "../actionTypes";

export const setIsLoading = (loading: boolean) => {
  return {
    type: SET_LOADING,
    loading: { loading },
  } as loadingAction;
};
