import React from 'react';


import {setDriver} from "../../store/driver/actions";
import Drivers from './Drivers';

import connect from "react-redux/es/connect/connect";
import {Avatar, ListItem} from 'react-native-elements';
import {View} from "react-native";

export class MyProfile extends React.Component {
  static navigationOptions = {
    title: 'Account',
  };

  constructor(props) {
    super(props);

    const randomDriver = Drivers[Math.floor(Math.random() * Drivers.length)]
    this.props.setDriver({...randomDriver})
  }

  render() {
    const driver = this.props.driver;
    if (!driver) {
      return (<View/>)
    }
    return (
      <React.Fragment>
        <View style={{paddingTop: 20, paddingLeft: 20, paddingRight: 20}}>
          <Avatar
            large
            size={150}
            rounded
            source={{uri: driver.picture}}
            activeOpacity={0.7}
          />
          <ListItem
            key='name'
            title={driver.name}
            hideChevron={true}
          />
          <ListItem
            key='number'
            title={driver.number}
            hideChevron={true}
          />
        </View>
      </React.Fragment>
    )
  }

}

const mapStateToProps = ({driver}) => {
  return {
    driver
  };
};

const mapDispatchToProps = {
  setDriver
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
