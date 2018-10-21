import React from 'react';
import {connect} from 'react-redux';
import {Platform, StyleSheet, Text, View} from "react-native";
import {List, ListItem} from 'react-native-elements'

import {grid} from "../../constants/Styles";
import LoadingView from '../../components/Loading';

import Swipeable from 'react-native-swipeable';

import {getDriverRoutesHistory, deleteRoute} from "../../store/driver/actions";
import Colors from "../../constants/Colors";
import {Icon} from "expo";

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

  renderRightContent(route) {
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
  getDriverRoutesHistory,
  deleteRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutesScreen);
