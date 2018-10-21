import React from "react";
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import { Provider, connect } from 'react-redux';

import PassengersStore from '../store/passenger/reducers';
import DriversStore from '../store/driver/reducers';

import PassengersNavigator from '../navigation/PassengerNavigator';
import DriversNavigator from '../navigation/DriverNavigator';

import Colors from '../constants/Colors';
import {setDriver, setPassenger} from "../store/rootReducers";

class LandingPage extends React.Component {
  renderLandingView() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonContainerPassenger}
          onPress={() => {
            this.props.setPassenger(true)
          }}
        >
          <Icon
            color='#fff'
            size={42}
            name='person'
            onPress={() => {
              this.props.setDriver(true);
            }}
          />
          <Text
            style={styles.textStylePassenger}
            color='#fff'
          >
            Passenger
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainerDriver}
          onPress={() => {
            this.props.setDriver(true);
          }}
        >
          <Icon
            color={Colors.tintColor}
            size={42}
            name='directions-car'
            onPress={() => {
              this.props.setDriver(true);
            }}
          />
          <Text style={styles.textStyleDriver}> Driver </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderDriversView() {
    return (
      <Provider store={ DriversStore }>
        <View style={styles.container}>
          <DriversNavigator />
        </View>
      </Provider>
    );
  }

  renderPassengersView() {
    return (
      <Provider store={ PassengersStore }>
        <View style={styles.container}>
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

const buttonContainer = {
  height: '100%',
  flex: 1,
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainerPassenger: {
    ...buttonContainer,
    backgroundColor: Colors.tintColor,
  },
  buttonContainerDriver: {
    ...buttonContainer,
    backgroundColor: '#fff',
  },
  textStyleDriver: {
    color: Colors.tintColor,
    fontSize: 16,
  },
  textStylePassenger: {
    color: '#fff',
    fontSize: 16,
  },
});

const mapStateToProps = ({isDriver, isPassenger}) => {
  return {isDriver, isPassenger};
};

const mapDispatchToProps = {
  setDriver,
  setPassenger,
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
