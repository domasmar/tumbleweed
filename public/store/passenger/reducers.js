import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunkMiddleware from "redux-thunk";

import {IS_LOADING} from "./actions";

function isLoading(state = false, action) {
  switch (action.type) {
    case IS_LOADING:
      return action.flag;
    default:
      return state;
  }
}


const reducers = combineReducers({
  isLoading,
});

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
  ),
);

export default store;
