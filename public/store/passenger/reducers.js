import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunkMiddleware from "redux-thunk";

import {
  IS_LOADING,
  SET_DRIVER_LIST,
} from "./actions";
import { SET_LOCATION } from "../driver/actions";

function isLoading(state = false, action) {
  switch (action.type) {
    case IS_LOADING:
      return action.flag;
    default:
      return state;
  }
}

function driversList(state = [], action) {
  switch (action.type) {
    case SET_DRIVER_LIST:
      return action.drivers;
    default:
      return state;
  }
}

function userLocation(state = null, action) {
  switch (action.type) {
    case SET_LOCATION:
      return action.userLocation;
    default:
      return state;
  }
}

const reducers = combineReducers({
  isLoading,
  driversList,
  userLocation,
});

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
  ),
);

export default store;
