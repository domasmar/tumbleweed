import React from "react";
import {Text} from 'react-native';

export default class LocationItem extends React.Component {


  render() {
    const {
      el
    } = this.props;

    console.info(el);

    return (
      <Text>hello</Text>
    );
  }
}
