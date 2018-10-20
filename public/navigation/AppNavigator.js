import React from 'react';
import {createStackNavigator} from 'react-navigation';

import LandingPage from "../screens/LandingPage";
import DriverNavigator from './DriverNavigator';
import PassengerNavigator from './PassengerNavigator';


const RootStack = createStackNavigator({
  Landing: {
    screen: LandingPage,
  },
  Passenger: PassengerNavigator,
  Driver: DriverNavigator,
});
export default class App extends React.Component {
  render() {
    return <RootStack/>;
  }
}
