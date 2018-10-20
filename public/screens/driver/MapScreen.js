import React from 'react';
import { Icon } from 'expo';
import {connect} from 'react-redux';
import {Platform} from 'react-native';

import {getDriverRoute, getLocation} from "../../store/driver/actions";

import Colors from '../../constants/Colors';
import MapView from '../../components/MapView';
import ErrorView from '../../components/Error';
import LoadingView from '../../components/Loading';
import Autocomplete from "../../components/Autocomplete";


class MapScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      from: null,
      to: null
    };
  }

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
        const {latitude, longitude} = this.props.userLocation.coords;

        const markers = [{
          key: 'current_marker',
          latitude: latitude,
          longitude: longitude,
          icon: {
            name: Platform.OS === 'ios' ? 'ios-pin' : 'md-pin',
            color: Colors.markerUser,
            size: 42,
          },
          title: 'You are here',
        }];

        if (this.state.from !== null) {
          if (this.state.from.lat === latitude && this.state.from.lng === longitude) {
            // From is the same as current possition
            markers.length = 0;
          }
          markers.push({
            key: 'from_marker',
            latitude: this.state.from.lat,
            longitude: this.state.from.lng,
            icon: {
              name: Platform.OS === 'ios' ? 'ios-pin' : 'md-pin',
              color: Colors.markerUser,
              size: 42,
            },
            title: 'From',
          })
        }

        if (this.state.to !== null) {
          markers.push({
            key: 'to_marker',
            latitude: this.state.to.lat,
            longitude: this.state.to.lng,
            icon: {
              name: Platform.OS === 'ios' ? 'ios-pin' : 'md-pin',
              color: Colors.markerUser,
              size: 42,
            },
            title: 'To',
          })
        }


        const renderCurrentLocation = () => {
          return (
            <Icon.Ionicons
              style={styles.currLocationButton}
              size={34}
              name={Platform.OS === 'ios' ? 'ios-locate-outline' : 'md-locate'}
              color={Colors.tabIconDefault}
              onPress={() =>
                this.setState(prev => {
                  return {
                    from: {
                      lat: latitude,
                      lng: longitude
                    }
                  }
                })
              }
            />
          );
        };

        const renderFromAutocomplete = () => {
          if (this.state.from === null) {
            return (
              <Autocomplete
                placeholder='Where from?'
                renderRightButton={renderCurrentLocation}
                onSelect={({lat, lng}) => {
                  this.setState(prev => {
                    return {
                      from: {
                        lat: lat,
                        lng: lng
                      }
                    }
                  })
                }}
              />
            );
          }
        };

        const renderToAutocomplete = () => {
          if (this.state.from !== null && this.state.to === null) {
            return (
              <Autocomplete
                placeholder='Where to?'
                onSelect={({lat, lng}) => {
                  this.setState(prev => {
                    return {
                      to: {
                        lat: lat,
                        lng: lng
                      }
                    }
                  })
                }}
              />
            );
          }
        };

        return (
          <React.Fragment>
            {renderFromAutocomplete()}

            {renderToAutocomplete()}

            <MapView
              latitude={latitude}
              longitude={longitude}
              zoom={0.005}
              markerArr={markers}
              polylines={this.props.driverRoutes}
            />

          </React.Fragment>);
      } else {
        return <ErrorView errorMessage={'Permission to access location was denied'}/>
      }
    }
    return <LoadingView/>;
  }
}


const styles = StyleSheet.create({
  currLocationButton: {
    marginTop: 12,
  },
});

const mapStateToProps = ({isLoading, userLocation, driverRoutes}) => {
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
