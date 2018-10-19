import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import React from "react";

export default class Loading extends React.Component {
  render() {
    return(
      <View
        style={styles.mapLoadingView}
      >
        <Text> Loading... </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapLoadingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
