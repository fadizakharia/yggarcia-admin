import { SET_BOOK, SET_CHARACTER } from "../actionTypes";
import updateObject from "../util/updateObject";

const initialCurrent: currentState = {
  book: {
    id: "",
    body: "",
    header: "",
    status: 0,
    subtitle: "",
    title: "",
    warning_message: "",
  },
  blogState: {
    tempData: "",
  },
  character: {
    id: "",
    name: "",
    gender: "",
    color: "",
    ethnicity: "",
    bio: "",
    date_of_birth: undefined,
    images: [],
  },
};

export const currentReducer = (
  initialState: currentState = initialCurrent,
  action: currentAction
) => {
  switch (action.type) {
    case SET_BOOK:
      return updateObject(initialState, action.current);
    case SET_CHARACTER:
      return updateObject(initialState, action.current);
    default:
      return initialState;
  }
};
