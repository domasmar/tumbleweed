import React from 'react';
import {Icon} from 'expo';
import {connect} from 'react-redux';
import {Button, Platform, StyleSheet, View} from 'react-native';

import {
  clearRoute,
  getDriverRoute,
  getLocation,
  saveRoute,
  updateDriverFrom,
  updateDriverRoute,
  updateDriverTo
} from "../../store/driver/actions";

import Colors from '../../constants/Colors';
import MapView from '../../components/MapView';
import ErrorView from '../../components/Error';
import LoadingView from '../../components/Loading';
import Autocomplete from "../../components/Autocomplete";

import {
  PinMarker,
  FinishMarker,
} from '../../components/markers/Markers';

class MapScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.map = React.createRef();
  }

  componentWillMount() {
    this.props.getLocation();
  }

  async save() {
    await this.props.saveRoute();
    this.clear();
    this.props.navigation.navigate('RoutesList');
  }

  clear() {
    this.props.updateDriverFrom(null);
    this.props.updateDriverTo(null);
    this.props.clearRoute();
  }

  render() {
    if (this.props.isLoading) {
      return <LoadingView/>;
    }
    if (!this.props.userLocation) {
      return <ErrorView errorMessage={'Permission to access location was denied'}/>
    }
    const {latitude, longitude} = this.props.userLocation.coords;
    const markers = [];

    if (this.props.driverFrom !== null) {
      markers.push(new PinMarker(this.props.driverFrom.lat, this.props.driverFrom.lng));
    }

    if (this.props.driverTo !== null) {
      markers.push(new FinishMarker(this.props.driverTo.lat, this.props.driverTo.lng));
    }


    const renderCurrentLocation = () => {
      return (
        <Icon.Ionicons
          style={styles.currLocationButton}
          size={34}
          name={Platform.OS === 'ios' ? 'ios-locate-outline' : 'md-locate'}
          color={Colors.tabIconDefault}
          onPress={() => {
            this.props.updateDriverFrom({lat: latitude, lng: longitude});
            this.props.updateDriverRoute();
          }}
        />
      );
    };

    const renderFromAutocomplete = () => {
      if (this.props.driverFrom === null) {
        return (
          <Autocomplete
            placeholder='Where from?'
            renderRightButton={renderCurrentLocation}
            onSelect={({lat, lng}) => {
              this.props.updateDriverFrom({lat, lng});
              this.props.updateDriverRoute();
            }}
          />
        );
      }
    };

    const renderToAutocomplete = () => {
      if (this.props.driverFrom !== null && this.props.driverTo === null) {
        return (
          <Autocomplete
            placeholder='Where to?'
            onSelect={({lat, lng}) => {
              this.props.updateDriverTo({lat, lng});
              this.props.getDriverRoute(
                this.props.driverFrom,
                this.props.driverTo
              )
            }}
          />
        );
      }
    };

    const renderConfirmButton = () => {
      if (this.props.driverFrom && this.props.driverTo) {
        return (
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title={'Clear'}
                color={Colors.tabIconDefault}
                onPress={() => {
                  this.clear()
                }}/>
            </View>
            <View style={styles.button}>
              <Button
                title={'Save'}
                color={Colors.tintColor}
                onPress={() => {
                  this.save()
                }}/>
            </View>
          </View>
        );
      }
    };

    return (
      <React.Fragment>
        {renderFromAutocomplete()}

        {renderToAutocomplete()}

        {renderConfirmButton()}

        <MapView
          ref={this.map}
          latitude={latitude}
          longitude={longitude}
          zoom={0.005}
          markerArr={markers}
          polylines={this.props.driverRoutes}
        />

      </React.Fragment>);

  }
}


const styles = StyleSheet.create({
  currLocationButton: {
    marginTop: 12,
  },
  buttonContainer: {
    width: '100%',
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    zIndex: 2,
  },
  button: {
    zIndex: 4,
    flexBasis: '50%',
  },
});

const mapStateToProps = ({isLoading, userLocation, driverRoutes, driverFrom, driverTo}) => {
  return {
    isLoading,
    userLocation,
    driverRoutes,
    driverFrom,
    driverTo
  };
};

const mapDispatchToProps = {
  getLocation,
  getDriverRoute,
  updateDriverFrom,
  updateDriverTo,
  updateDriverRoute,
  clearRoute,
  saveRoute
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
