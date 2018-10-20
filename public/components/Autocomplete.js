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
          listViewDisplayed='auto'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 20,
    width: '100%',
    height: 'auto',
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#fff',
    zIndex: 4,
  },
});
