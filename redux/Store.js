import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import remoteSensingReducer from "./remoteSensingReducer";

const reduce = combineReducers({
  remoteSensing: remoteSensingReducer
});

export default createStore(reduce, applyMiddleware(thunk));
