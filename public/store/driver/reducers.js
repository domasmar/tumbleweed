import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunkMiddleware from "redux-thunk";

import {
  SET_ROUTE,
  IS_LOADING,
  SET_LOCATION
} from "./actions";

function isLoading(state = false, action) {
  switch (action.type) {
    case IS_LOADING:
      return action.flag;
    default:
      return state;
  }
}

function driverRoutes(state = [], action) {
  switch (action.type) {
    case SET_ROUTE:
      return [...state, action.route.data];
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
  userLocation,
  driverRoutes,
});

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
  ),
);

export default store;
