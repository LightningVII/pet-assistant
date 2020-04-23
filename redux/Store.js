import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import remoteSensingReducer from "./remoteSensingReducer";
import userReducer from "./userReducer";
import mapReducer from "./mapReducer";
import messageReducer from "./messageReducer";

const reduce = combineReducers({
  remoteSensing: remoteSensingReducer,
  user: userReducer,
  map: mapReducer,
  message: messageReducer,
});

export default createStore(reduce, applyMiddleware(thunk));
