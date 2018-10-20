import { combineReducers } from 'redux'
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

const rootReducer = combineReducers({
  isLoading,
  userLocation,
  driverRoutes,
});

export default rootReducer;
