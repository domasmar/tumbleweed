import to from 'await-to-js';
import axios from 'axios';
import React from 'react';
import {connect} from 'react-redux';
import {Platform, StyleSheet, View} from "react-native";
import {List, ListItem} from 'react-native-elements'

import {grid} from "../../constants/Styles";
import LoadingView from '../../components/Loading';

import Swipeable from 'react-native-swipeable';

import {
  deleteRoute,
  getDriverRoute,
  getDriverRoutesHistory,
  setDriverFrom,
  setDriverTo
} from "../../store/driver/actions";
import Colors from "../../constants/Colors";
import {Icon} from "expo";

class RoutesScreen extends React.Component {
  static navigationOptions = {
    title: 'Routes',
  };

  constructor(props) {
    super(props);
    this.isCancelled = false;
  }

  componentWillMount() {
    this.props.getDriverRoutesHistory(this.props.driver);
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  async openRouteView(route) {
    const [err, resp] = await to(axios.get(`https://tumbleweed-hack.herokuapp.com/direction/route/${route.routeId}`));
    const {startLocation, endLocation} = resp.data.route;
    if (!this.isCancelled) {
      await to(this.props.getDriverRoute(startLocation, endLocation));
      this.props.setDriverTo(endLocation);
      this.props.setDriverFrom(startLocation);
      this.props.navigation.navigate('MapStack');
    }
  }

  renderListItem(route) {
    if (route.hidden !== true) {
      return (
        <ListItem
          onPress={() => this.openRouteView(route)}
          // onPressRightIcon={() => console.info(route)}
          leftIcon={{name: 'place'}}
          title={route.startLabel}
          subtitle={route.endLabel}
        />
      );
    }
  }

  deleteRoute(route) {
    this.props.deleteRoute(route);
    // console.info("deleting", route);
    this.props.getDriverRoutesHistory(this.props.driver);
  }

  renderRightContent() {
    return (
      <View style={{backgroundColor: Colors.markerFinish}}>
        <Icon.Ionicons
          style={{paddingLeft: 30, paddingTop: 5}}
          size={60}
          name={Platform.OS === 'ios' ? 'ios-trash-outline' : 'md-trash'}
          color={Colors.tabIconDefault}
        />
      </View>
    )
  }

  render() {
    if (!this.props.isLoading) {
      return (
        <List>
          {this.props.driverRoutesHistory.map((route) => {
            return (
              <Swipeable
                key={Math.random().toString(36).substr(2, 9)}
                rightContent={this.renderRightContent()}
                onRightActionRelease={() => this.deleteRoute(route)}>
                {this.renderListItem(route)}
              </Swipeable>
            )
          })}
        </List>
      );
    }
    return <LoadingView/>;
  }
}

const styles = StyleSheet.create({
  ...grid,
  textLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
});

const mapStateToProps = ({isLoading, driver, driverRoutesHistory}) => {
  return {isLoading, driver, driverRoutesHistory};
};

const mapDispatchToProps = {
  setDriverTo,
  setDriverFrom,
  getDriverRoute,
  getDriverRoutesHistory,
  deleteRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutesScreen);
