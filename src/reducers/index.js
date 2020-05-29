import { combineReducers } from "redux";
import { reducer } from "./airplanes";

const rootReducer = combineReducers({
  reducer: reducer
});

export default rootReducer;