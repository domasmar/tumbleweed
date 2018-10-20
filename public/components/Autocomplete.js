import React from "react";
// import {StyleSheet} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {StyleSheet, View} from "react-native";

export default class Autocomplete extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const {
      currentLocation,
      renderRightButton,
      onSelect
    } = this.props;

    return (
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          apiKey='AIzaSyBpDvGSJUey9dg2tTZURDcYSNPi35lp8Vs'
          debounce={500}
          minLength={2}
          query={{
            key: 'AIzaSyBpDvGSJUey9dg2tTZURDcYSNPi35lp8Vs',
            language: 'lt', // language of the results
            types: 'geocode' // default: 'geocode'
          }}
          GoogleReverseGeocodingQuery={{
            latlng: '54.6872,25.2797', // vilnius
            rankby: 'distance',
          }}
          GooglePlacesSearchQuery={{}}
          placeholder={this.props.placeholder}
          listViewDisplayed='auto'
          onPress={(data, details = null) => {
            // onSelect(data, details)
            // console.info(data, details);
            onSelect(details.geometry.location);
          }}
          renderRightButton={renderRightButton}
          nearbyPlacesAPI={'GoogleReverseGeocoding'}
          fetchDetails={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 'auto',
    flex: 1,
    alignItems: 'stretch',
    zIndex: 4,
  },
});
