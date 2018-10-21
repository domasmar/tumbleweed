import to from 'await-to-js';
import axios from 'axios';
import {Location, Permissions} from "expo";

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
  return async function (dispatch) {
    dispatch(isLoading(true));
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
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
  return async function (dispatch) {
    dispatch(isLoading(true));
    const [err, route] = await to(axios.post('https://tumbleweed-hack.herokuapp.com/direction/route', {
      startLocation,
      endLocation,
    }));
    if (!err && route) {
      dispatch(setRoute(route));
    } else {
      // console.error(err);
    }
    return dispatch(isLoading(false));
  }
}

export function clearRoute() {
  return function (dispatch) {
    dispatch(setRoute(null))
  }
}

export function updateDriverFrom(from) {
  return function (dispatch) {
    dispatch(setDriverFrom(from))
  }
}

export function updateDriverTo(to) {
  return function (dispatch) {
    dispatch(setDriverTo(to))
  }
}

export function updateDriverRoute() {
  return function (dispatch, ownProps) {
    const {
      driverFrom,
      driverTo
    } = ownProps();

    console.info(driverFrom);
    if (driverFrom !== null && driverTo !== null) {
      getDriverRoute(driverFrom, driverTo)
    }
  }
}

export const SET_DRIVER_FROM = 'SET_DRIVER_FROM';

function setDriverFrom(from) {
  return {
    type: SET_DRIVER_FROM,
    driverFrom: from
  }
}

export const SET_DRIVER_TO = 'SET_DRIVER_TO';

function setDriverTo(to) {
  return {
    type: SET_DRIVER_TO,
    driverTo: to
  }
}

export function saveRoute() {
  return async function (dispatch, props) {
    const {
      driverRoutes,
      driver
    } = props();
    const route = driverRoutes[0];

    dispatch(isLoading(true));

    const startUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + [route.startLocation.lat, route.startLocation.lng].join(',') + "&key=" + "AIzaSyBpDvGSJUey9dg2tTZURDcYSNPi35lp8Vs";
    const endUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + [route.endLocation.lat, route.endLocation.lng].join(',') + "&key=" + "AIzaSyBpDvGSJUey9dg2tTZURDcYSNPi35lp8Vs";

    const [startErr, start] = await to(axios.get(startUrl));
    const [endErr, end] = await to(axios.get(endUrl));

    const startStreetName = start.data.results[0].address_components[1].short_name;
    const startStreetNumber = start.data.results[0].address_components[0].short_name;
    const startCity = start.data.results[0].address_components[2].short_name;

    const startLabel = `${startStreetName} ${startStreetNumber}, ${startCity}`;

    const endStreetName = end.data.results[0].address_components[1].short_name;
    const endStreetNumber = end.data.results[0].address_components[0].short_name;
    const endCity = end.data.results[0].address_components[2].short_name;

    const endLabel = `${endStreetName} ${endStreetNumber}, ${endCity}`;

    const routeRequest = {
      driverId: driver.userId,
      carId: driver.number,
      startLabel: startLabel,
      endLabel: endLabel,
      route: route,
      type: 'SHORT_TERM',
      hidden: false,
      active: true
    };

    await to(axios.post('https://tumbleweed-hack.herokuapp.com/driver/path', routeRequest));
    dispatch(isLoading(false));
  }
}

export function setDriver(driver) {
  return function (dispatch) {
    dispatch({
      type: 'driver',
      driver: driver
    })
  }
}

export const GET_DRIVER_ROUTES = 'GET_DRIVER_ROUTES';

function setDriverRoutesHistory(routes) {
  return {
    type: GET_DRIVER_ROUTES,
    routes,
  };
}

export function getDriverRoutesHistory(driver = {}) {
  return async function (dispatch) {
    dispatch(isLoading(true));
    const [err, routes] = await to(axios.get(`https://tumbleweed-hack.herokuapp.com/driver/${driver.userId}/paths`));
    if (!err && routes) {
      dispatch(setDriverRoutesHistory(routes.data));
    } else {
    //   console.error(err);
    }
    dispatch(isLoading(false));
  };
}
