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
            language: 'LT', // language of the results
            types: 'geocode', // default: 'geocode'
            location: "54.6872, 25.2797",
            radius: "100000", //100 km
            components: "country:LT", // country name
            strictbounds: true,
          }}
          GoogleReverseGeocodingQuery={{
            latlng: '54.6872, 25.2797', // vilnius
            rankby: 'distance'
          }}
          placeholder={this.props.placeholder}
          listViewDisplayed='auto'
          onPress={(data, details = null) => {
            // onSelect(data, details)
            // console.info(data, details);
            onSelect(details.geometry.location);
          }}
          renderRightButton={ renderRightButton }
          nearbyPlacesAPI={'GoogleReverseGeocoding'}
          fetchDetails={true}
          styles={{
            container: {
              backgroundColor: '#fff',
            },
            textInput: {
              padding: 0,
              height: 50,
            },
            textInputContainer: {
              padding: 0,
              height: 60,
              backgroundColor: '#fff',
              paddingRight: 15,
            }
          }}
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
