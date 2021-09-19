import { SET_BOOK, SET_CHARACTER } from "../actionTypes";

export const setBook = (values: currentState["book"]): currentAction => {
  return {
    type: SET_BOOK,
    current: { book: { ...values } },
  };
};

export const setCharacter = (
  values: currentState["character"]
): currentAction => {
  return {
    type: SET_CHARACTER,
    current: { character: values },
  };
};
