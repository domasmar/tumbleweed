import React from 'react';


import {setPassenger} from "../../store/passenger/actions";
import Passengers from '../Passengers';

import connect from "react-redux/es/connect/connect";
import {Avatar, ListItem} from 'react-native-elements';
import {View} from "react-native";

export class MyProfile extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    const randomPassenger = Passengers[Math.floor(Math.random() * Passengers.length)]
    this.props.setPassenger({...randomPassenger})
  }

  render() {
    const passenger = this.props.passenger;
    if (!passenger) {
      return (<View/>)
    }
    return (
      <React.Fragment>
        <View style={{paddingTop: 20, paddingLeft: 20, paddingRight: 20}}>
          <Avatar
            xlarge
            size={150}
            rounded
            source={{uri: passenger.picture}}
            activeOpacity={0.7}
          />
          <ListItem
            key='name'
            title={passenger.name}
            hideChevron={true}
          />
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
