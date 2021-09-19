const updateObject = (
  oldState: userState | loadingState | currentState,
  state: userState | loadingState | currentState
) => {
  return {
    ...oldState,
    ...state,
  };
};
export default updateObject;
