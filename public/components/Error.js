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
        style={styles.mapErrorView}
      >
        <Text
          style={styles.errorMessage}
        >
          {this.props.errorMessage}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapErrorView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  errorMessage: {
    color: '#ff0000',
  },
});
