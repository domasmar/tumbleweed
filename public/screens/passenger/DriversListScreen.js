import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';

import {setSelectedRoute} from '../../store/passenger/actions';
import LoadingView from '../../components/Loading';

import {mappedDrivers} from '../Drivers';

import {List, ListItem} from 'react-native-elements'
import axios from "axios";

class DriversListScreen extends React.Component {
  static navigationOptions = {
    title: 'Drivers Routes',
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  async previewDriver(driver) {
    const response = await axios.get("https://tumbleweed-hack.herokuapp.com/direction/route/" + driver.driverInfo.routeId);
    const route = response.data.route;
    this.props.setSelectedRoute(route);
    this.props.navigation.navigate('Map');
  }

  selectDriver(driver) {
    console.log(driver);
  }

  render() {
    if (!this.props.isLoading) {
      return (
        <List>
          {
            this.props.driversList.map((driver) => (
                <ListItem
                  onPress={() => this.previewDriver(driver)}
                  onPressRightIcon={() => this.selectDriver(driver)}
                  rightIcon={{name: 'chat'}}
                  key={Math.random()}
                  roundAvatar
                  avatar={{uri: mappedDrivers[driver.driverInfo.driverId].picture}}
                  title={mappedDrivers[driver.driverInfo.driverId].name}
                  subtitle={mappedDrivers[driver.driverInfo.driverId].number}
                />
              )
            )
          }

        </List>
      );
    }
    return <LoadingView/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 5,
    paddingLeft: 5,
  },
  col6: {
    flexBasis: '50%',
  },
  col4: {
    flexBasis: '33.33%',
  },
  col3: {
    flexBasis: '25%',
  },
  row: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
});

const mapStateToProps = ({isLoading, driversList}) => {
  return {isLoading, driversList};
};

const mapDispatchToProps = {
  setSelectedRoute
};

export default connect(mapStateToProps, mapDispatchToProps)(DriversListScreen);
