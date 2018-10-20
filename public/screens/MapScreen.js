import React from 'react';

import { connect } from 'react-redux';
import {Platform, StyleSheet, View} from 'react-native';

import { getLocation, getDriverRoute } from "../store/driver/actions";

import Colors from '../constants/Colors';
import MapView from '../components/MapView';
import ErrorView from '../components/Error';
import LoadingView from '../components/Loading';
import Autocomplete from '../components/Autocomplete';


class MapScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    this.props.getLocation();
    this.props.getDriverRoute(
      {
        lat: 54.712684,
        lng: 25.147928,
      },
      {
        lat: 54.696464,
        lng: 25.278759,
      }
    );
  }

  render() {
    if (!this.props.isLoading) {
      if (this.props.userLocation) {
        const { latitude, longitude } = this.props.userLocation.coords;

        const marker = {
          latitude,
          longitude,
          icon: {
            name: Platform.OS === 'ios' ? 'ios-pin' : 'md-pin',
            color: Colors.markerUser,
            size: 42,
          },
          title: 'You are here',
        };

        return (
          <View styles={styles.container}>
            <Autocomplete />
            <MapView
              latitude={ latitude }
              longitude={ longitude }
              zoom={ 0.005 }
              markerArr={[ marker ]}
              polylines={this.props.driverRoutes}
            />
          </View>
        );
      } else {
        return <ErrorView errorMessage={'Permission to access location was denied'} />
      }
    }
    return <LoadingView />;
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
  },
});


const mapStateToProps = ({
  isLoading,
  userLocation,
  driverRoutes,
}) => {
  return {
    isLoading,
    userLocation,
    driverRoutes,
  };
};

const mapDispatchToProps = {
  getLocation,
  getDriverRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
