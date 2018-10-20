import React from "react";

import {Button, View, StyleSheet, Text} from 'react-native';
import { Icon } from 'react-native-elements';

export default class LandingPage extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Icon
            reverse
            name='sentiment-satisfied'
            onPress={() =>
              this.props.navigation.navigate('Passenger')
            }
          />
          <Text>
            Passenger
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Icon
            reverse
            name='directions-car'
            onPress={() =>
              this.props.navigation.navigate('Driver')
            }
          />
          <Text>
            Driver
          </Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center'
  }
});

