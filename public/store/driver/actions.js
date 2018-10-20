import to from 'await-to-js';
import axios from 'axios';
import { Location, Permissions } from "expo";

export const IS_LOADING = 'IS_LOADING';
export function isLoading(flag) {
  return {
    type: IS_LOADING,
    flag,
  };
}

export const SET_LOCATION = 'SET_LOCATION';
function setLocation(location) {
  return {
    type: SET_LOCATION,
    userLocation: location,
  };
}

export function getLocation() {
  return async function(dispatch) {
    dispatch(isLoading(true));
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    const userLocation = status === 'granted' ? await Location.getCurrentPositionAsync({}) : null;
    dispatch(isLoading(false));
    return dispatch(setLocation(userLocation));
  }
}

export const SET_ROUTE = 'SET_ROUTE';
function setRoute(route) {
  return {
    type: SET_ROUTE,
    route,
  };
}

export function getDriverRoute(startLocation, endLocation) {
  return async function(dispatch) {
    dispatch(isLoading(true));
    const [err, route] = await to(axios.post('https://tumbleweed-hack.herokuapp.com/direction/route', {
      startLocation,
      endLocation,
    }));
    if (!err && route) {
      dispatch(setRoute(route));
    } else {
      console.error(err);
    }
    return dispatch(isLoading(false));
  }
}
