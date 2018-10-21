import React from 'react';


import {setDriver} from "../../store/driver/actions";
import Drivers from '../Drivers';

import connect from "react-redux/es/connect/connect";
import {Avatar, ListItem, Rating} from 'react-native-elements';
import {View} from "react-native";

export class MyProfile extends React.Component {
  static navigationOptions = {
    title: 'Account',
  };

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    const randomDriver = Drivers[0] //[Math.floor(Math.random() * Drivers.length)]
    this.props.setDriver({...randomDriver})
  }

  render() {
    const driver = this.props.driver;
    if (!driver) {
      return (<View/>)
    }
    return (
      <React.Fragment>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row',paddingTop: 20, paddingLeft: 20, paddingRight: 20}}>
            <Avatar
              large
              size={150}
              rounded
              source={{uri: driver.picture}}
              activeOpacity={0.7}
            />
            <Rating
              style={{paddingTop: 30, paddingLeft: 25}}
              readonly
              imageSize={20}
              type={'custom'}
              startingValue={4.5}
              ratingBackgroundColor={'transparent'}
            />
          </View>
          <View style={{flexDirection: 'column'}}>
            <ListItem
              key='name'
              title={driver.name}
              subtitle={"Name"}
              hideChevron={true}
            />
            <ListItem
              key='number'
              title={driver.number}
              subtitle={"Car Number"}
              hideChevron={true}
            />
          </View>
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
