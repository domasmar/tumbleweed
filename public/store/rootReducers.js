import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunkMiddleware from "redux-thunk";

const IS_DRIVER = 'IS_DRIVER';
const IS_PASSENGER = 'IS_PASSENGER';

// REDUCERS
function isDriver(state = false, action) {
  switch (action.type) {
    case IS_DRIVER:
      return action.isDriver;
    default:
      return state;
  }
}

function isPassenger(state = false, action) {
  switch (action.type) {
    case IS_PASSENGER:
      return action.isPassenger;
    default:
      return state;
  }
}

// ACTIONS
export function setDriver(isDriver) {
  return {
    type: IS_DRIVER,
    isDriver,
  };
}

export function setPassenger(isPassenger) {
  return {
    type: IS_PASSENGER,
    isPassenger,
  };
}

const rootReducer = combineReducers({
  isDriver,
  isPassenger,
});

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
  ),
);

export default store;
