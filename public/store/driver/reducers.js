import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from "redux-thunk";

import {IS_LOADING, SET_DRIVER_FROM, SET_DRIVER_TO, SET_LOCATION, SET_ROUTE, GET_DRIVER_ROUTES} from "./actions";

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
      return action.route === null ? [] : [...state, action.route.data];
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

function driverFrom(state = null, action) {
  switch (action.type) {
    case SET_DRIVER_FROM:
      return action.driverFrom;
    default:
      return state;
  }
}

function driverTo(state = null, action) {
  switch (action.type) {
    case SET_DRIVER_TO:
      return action.driverTo;
    default:
      return state;
  }
}

function driver(state = null, action) {
  switch (action.type) {
    case 'driver':
      return action.driver;
    default:
      return state;
  }
}

function driverRoutesHistory(state = [], action) {
  switch (action.type) {
    case GET_DRIVER_ROUTES:
      return action.routes;
    default:
      return state;
  }
}

const reducers = combineReducers({
  isLoading,
  userLocation,
  driverRoutes,
  driverFrom,
  driverTo,
  driver,
  driverRoutesHistory,
});

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
  ),
);

export default store;
