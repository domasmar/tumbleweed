import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View} from "react-native";

import {grid} from "../../constants/Styles";
import ListView from '../../components/ListView';
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

  renderItem(item) {
    if (item.hidden !== 'true') {
      return (
        <React.Fragment>
          <View style={styles.container}>
            <View style={styles.col3}>
              <View style={ styles.row }>
                <Text style={styles.textLabel}>DRIVER:</Text>
                <Text>{item.driverId}</Text>
              </View>
            </View>
            <View style={styles.col3}>
              <View style={ styles.row }>
                <Text style={styles.textLabel}>CAR:</Text>
                <Text>{item.carId}</Text>
              </View>
            </View>
            <View style={styles.col4}>
              <View style={ styles.row }>
                <Text style={styles.textLabel}>TYPE:</Text>
                <Text>{item.type}</Text>
              </View>
            </View>
          </View>
        </React.Fragment>
      );
    }
    return null;
  }

  render() {
    if (!this.props.isLoading) {
      // console.info(this.props.driverRoutesHistory.length);
      return (
        <ListView
          items={
            this.props.driverRoutesHistory.map(item => ({
              ...item,
              key: Math.random().toString(36).substr(2, 9),
            }))
          }
          getRenderItem={this.renderItem}
        />
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
