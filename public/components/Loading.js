import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import React from "react";

export default class Loading extends React.Component {
  render() {
    return(
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})
