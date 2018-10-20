import React from 'react';

import { connect } from 'react-redux';
import { Platform, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { getLocation, getDriverRoute } from "../store/actions";

import Colors from '../constants/Colors';
import MapView from '../components/MapView';
import ErrorView from '../components/Error';
import LoadingView from '../components/Loading';


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

  // googlePlacesInput = () => {
  //   return (
  //     <GooglePlacesAutocomplete
  //       placeholder='Search'
  //       minLength={2} // minimum length of text to search
  //       autoFocus={false}
  //       returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
  //       listViewDisplayed='auto'    // true/false/undefined
  //       fetchDetails={true}
  //       renderDescription={row => row.description} // custom description render
  //       onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
  //         console.log(data, details);
  //       }}
  //
  //       getDefaultValue={() => ''}
  //
  //       query={{
  //         key: 'AIzaSyBpDvGSJUey9dg2tTZURDcYSNPi35lp8Vs',
  //         language: 'lt',
  //         types: '(cities)'
  //       }}
  //
  //       styles={{
  //         textInputContainer: {
  //           width: '100%'
  //         },
  //         description: {
  //           fontWeight: 'bold'
  //         },
  //         predefinedPlacesDescription: {
  //           color: '#1faadb'
  //         }
  //       }}
  //
  //       currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
  //       currentLocationLabel="Current location"
  //       nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
  //       GoogleReverseGeocodingQuery={{
  //         // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
  //       }}
  //       GooglePlacesSearchQuery={{
  //         // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
  //         rankby: 'distance',
  //         types: 'food'
  //       }}
  //
  //       filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
  //       predefinedPlaces={[homePlace, workPlace]}
  //
  //       debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
  //       renderRightButton={() => <Text>Custom text after the input</Text>}
  //     />
  //   );
  // };

  render() {
    if (!this.props.isLoading) {
      if (this.props.userLocation) {
        const { latitude, longitude } = this.props.userLocation.coords;
        // console.info(this.props.driverRoutes);

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
          <MapView
            latitude={ latitude }
            longitude={ longitude }
            zoom={ 0.005 }
            markerArr={[ marker ]}
            polylines={this.props.driverRoutes}
          />
        );
      } else {
        return <ErrorView errorMessage={'Permission to access location was denied'} />
      }
    }
    return <LoadingView />;
  }
}

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
