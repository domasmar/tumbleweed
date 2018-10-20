import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {StyleSheet, View} from "react-native";
// import { StyleSheet, View, TextInput } from "react-native";

export default class Autocomplete extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          apiKey='AIzaSyBpDvGSJUey9dg2tTZURDcYSNPi35lp8Vs'
          debounce={500}
          minLength={2}
          query={{
            key: 'AIzaSyBpDvGSJUey9dg2tTZURDcYSNPi35lp8Vs',
            language: 'lt', // language of the results
            types: 'address' // default: 'geocode'
          }}
          GooglePlacesSearchQuery={{
            location: '54.6872,25.2797', // vilnius
            rankby: 'distance',
            types: 'food',
          }}
          placeholder={this.props.placeholder}
          listViewDisplayed='auto'
          onPress={(data, details = null) => {
            console.info(data, details);
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
