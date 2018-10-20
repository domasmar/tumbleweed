import React from 'react';
import { Icon } from 'expo';
import {connect} from 'react-redux';
import {Button, Platform, StyleSheet, View} from 'react-native';

import {getLocation} from '../../store/driver/actions';
import {getDriversList} from '../../store/passenger/actions';

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

    this.state = {
      from: null,
      to: null
    };
  }

  componentWillMount() {
    this.props.getLocation();
  }

  render() {
    if (!this.props.isLoading) {
      if (this.props.userLocation) {

        const {latitude, longitude} = this.props.userLocation.coords;

        const markers = [new PinMarker(latitude, longitude, 'You are here')];

        if (this.state.from !== null) {
          if (this.state.from.lat === latitude && this.state.from.lng === longitude) {
            // From is the same as current possition
            markers.length = 0;
          }
          markers.splice(0, 1, new PinMarker(this.state.from.lat, this.state.from.lng));
        }

        if (this.state.to !== null) {
          markers.push(new FinishMarker(this.state.to.lat, this.state.to.lng));
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
                  });
                  if (this.state.from && this.state.to) {
                    this.props.getDriversList(this.state.from, this.state.to);
                    this.props.navigation.navigate('DriversListStack');
                  }
                }}
              />
            );
          }
        };

        const renderClearSearch = () => {
          if (this.state.from && this.state.to) {
            return (
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button
                    title={'Clear Search'}
                    color={Colors.tabIconDefault}
                    onPress={() => {
                      this.setState(prev => {
                        return {
                          from: null,
                          to: null,
                        }
                      })
                    }}/>
                </View>
              </View>
            );
          }
        }

        return (
          <React.Fragment>
            {renderFromAutocomplete()}

            {renderToAutocomplete()}

            {renderClearSearch()}

            <MapView
              latitude={latitude}
              longitude={longitude}
              zoom={0.005}
              markerArr={markers}
              polylines={[this.props.selectedRoute]}
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
    flexBasis: '100%',
  },
});

const mapStateToProps = ({isLoading, userLocation, driversList, selectedRoute}) => {
  return {
    isLoading,
    userLocation,
    driversList,
    selectedRoute,
  };
};

const mapDispatchToProps = {
  getLocation,
  getDriversList,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
