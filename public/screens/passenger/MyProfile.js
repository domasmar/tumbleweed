import React from 'react';


import {setPassenger} from "../../store/passenger/actions";
import Passengers from '../Passengers';

import connect from "react-redux/es/connect/connect";
import {Avatar, ListItem, Rating} from 'react-native-elements';
import {View} from "react-native";

export class MyProfile extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    const randomPassenger = Passengers[0] //[Math.floor(Math.random() * Passengers.length)]
    this.props.setPassenger({...randomPassenger})
  }

  render() {
    const passenger = this.props.passenger;
    if (!passenger) {
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
              source={{uri: passenger.picture}}
              activeOpacity={0.7}
            />
            <Rating
              style={{paddingTop: 30, paddingLeft: 25}}
              readonly
              imageSize={20}
              type={'custom'}
              startingValue={5}
              ratingBackgroundColor={'transparent'}
            />
          </View>
          <View style={{flexDirection: 'column'}}>
            <ListItem
              key='name'
              title={passenger.name}
              subtitle={"Name"}
              hideChevron={true}
            />
          </View>
        </View>
      </React.Fragment>
    )
  }

}

const mapStateToProps = ({passenger}) => {
  return {
    passenger
  };
};

const mapDispatchToProps = {
  setPassenger
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
