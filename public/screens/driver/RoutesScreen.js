import to from 'await-to-js';
import axios from 'axios';
import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from "react-native";
import {List, ListItem} from 'react-native-elements'

import {grid} from "../../constants/Styles";
import LoadingView from '../../components/Loading';

import {
  setDriverTo,
  setDriverFrom,
  getDriverRoute,
  getDriverRoutesHistory
} from "../../store/driver/actions";

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
          leftIcon={{ name: 'place' }}
          key={Math.random().toString(36).substr(2, 9)}
          title={route.startLabel}
          subtitle={route.endLabel}
        />
      );
    }
  }

  render() {
    if (!this.props.isLoading) {
      return (
        <List>
          {this.props.driverRoutesHistory.map((route) => this.renderListItem(route))}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutesScreen);
