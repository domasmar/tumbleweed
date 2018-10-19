import React from 'react';

import {
  Constants,
  Location,
  Permissions,
} from 'expo';

import { connect } from 'react-redux';
import { Platform } from 'react-native';

import Colors from '../constants/Colors';
import MapView from '../components/MapView';
import LoadingView from '../components/Loading';

class MapScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      location: null,
      errorMessage: null,
      currLocationTitle: 'Your are here',
    };
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocation();
    }
  }

  async _getLocation() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    if (this.state.location) {
      const { latitude, longitude } = this.state.location.coords;

      const marker = {
        latitude,
        longitude,
        icon: {
          name: Platform.OS === 'ios' ? 'ios-pin' : 'md-pin',
          color: Colors.markerUser,
          size: 42,
        },
        title: this.state.currLocationTitle,
      };

      return (
        <MapView
          latitude={ latitude }
          longitude={ longitude }
          zoom={ 0.005 }
          markerArr={[ marker ]}
        />
      );
    }
    return <LoadingView />;
  }
}

const mapStateToProps = (state) => {
  const { isLoading } = state;
  return { isLoading };
};

export default connect(mapStateToProps)(MapScreen);
