import to from 'await-to-js';
import axios from 'axios';

export const IS_LOADING = 'IS_LOADING';
export function isLoading(flag) {
  return {
    type: IS_LOADING,
    flag,
  };
}

export const SET_DRIVER_LIST = 'SET_DRIVER_LIST';
function setDriverList(drivers) {
  return {
    type: SET_DRIVER_LIST,
    drivers,
  };
}

function selectedRoute(route) {
  return {
    type: 'selectedRoute',
    route
  }
}

export function setSelectedRoute(route) {
  return function(dispatch) {
    dispatch(selectedRoute(route))
  }
}

export function getDriversList(startLocation, endLocation) {
  return async function(dispatch) {
    dispatch(isLoading(true));
    const [err, resp] = await to(axios.post('https://tumbleweed-hack.herokuapp.com/passanger/drivers/nearest', {
      startLocation,
      endLocation,
    }));
    if (!err && resp) {
      console.info(resp.data);
      dispatch(setDriverList(resp.data));
    } else {
      console.error(err);
    }
    return dispatch(isLoading(false));
  }
}
