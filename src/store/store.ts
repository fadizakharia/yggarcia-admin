import { createStore, combineReducers } from "redux";
import { currentReducer } from "./reducers/current";
import { LoadingReducer } from "./reducers/loading";
import { userReducer } from "./reducers/user";
const reducers = combineReducers({
  user: userReducer,
  loading: LoadingReducer,
  current: currentReducer,
});
export default createStore(reducers);
