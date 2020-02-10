import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import vol from "./vol";
import todo from './todo';
import calendar from "./calendar";
import { penderReducer } from "redux-pender";

export default combineReducers({
  calendar,
  auth,
  user,
  vol,
  pender: penderReducer,
  todo
});