import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from "react-native";
import {List, ListItem} from 'react-native-elements'

import {grid} from "../../constants/Styles";
import LoadingView from '../../components/Loading';

import { getDriverRoutesHistory } from "../../store/driver/actions";

class RoutesScreen extends React.Component {
  static navigationOptions = {
    title: 'Routes',
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getDriverRoutesHistory(this.props.driver);
  }

  renderListItem(route) {
    if (route.hidden !== true) {
      return (
        <ListItem
          onPress={() => console.info(route)}
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
  getDriverRoutesHistory,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutesScreen);
