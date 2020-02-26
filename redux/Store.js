import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import remoteSensingReducer from "./remoteSensingReducer";
import userReducer from "./userReducer";

const reduce = combineReducers({
  remoteSensing: remoteSensingReducer,
  user: userReducer
});

export default createStore(reduce, applyMiddleware(thunk));
