import React from "react";
import {Platform, StatusBar, View, StyleSheet, Text} from 'react-native';
import { Icon } from 'react-native-elements';
import { Provider, connect } from 'react-redux';

import PassengersStore from '../store/passenger/reducers';
import DriversStore from '../store/driver/reducers';

import PassengersNavigator from '../navigation/PassengerNavigator';
import DriversNavigator from '../navigation/DriverNavigator';

import {setDriver, setPassenger} from "../store/rootReducers";

class LandingPage extends React.Component {
  renderLandingView() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Icon
            reverse
            name='sentiment-satisfied'
            onPress={() => {
              this.props.setPassenger(true)
              console.info(this.props.isPassenger);
            }}
          />
          <Text>
            Passenger
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Icon
            reverse
            name='directions-car'
            onPress={() => {
              this.props.setDriver(true);
              console.info(this.props.isDriver);
            }}
          />
          <Text>
            Driver
          </Text>
        </View>
      </View>
    );
  }

  renderDriversView() {
    return (
      <Provider store={ DriversStore }>
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <DriversNavigator />
        </View>
      </Provider>
    );
  }

  renderPassengersView() {
    return (
      <Provider store={ PassengersStore }>
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <PassengersNavigator />
        </View>
      </Provider>
    );
  }

  render() {
    if (!this.props.isDriver && !this.props.isPassenger) {
      return this.renderLandingView();
    } else if (this.props.isDriver) {
      return this.renderDriversView();
    } else if (this.props.isPassenger) {
      return this.renderPassengersView();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center'
  }
});

const mapStateToProps = ({isDriver, isPassenger}) => {
  return {isDriver, isPassenger};
};

const mapDispatchToProps = {
  setDriver,
  setPassenger,
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
