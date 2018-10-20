import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';

import { grid } from '../../constants/Styles';
import ListView from '../../components/ListView';
import LoadingView from '../../components/Loading';

class DriversListScreen extends React.Component {
  static navigationOptions = {
    title: 'Drivers',
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  renderItem(item) {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <View style={styles.col3}>
            <View style={ styles.row }>
              <Text style={styles.textLabel}>DRIVER:</Text>
              <Text>{item.driverInfo.driverId}</Text>
            </View>
          </View>
          <View style={styles.col3}>
            <View style={ styles.row }>
              <Text style={styles.textLabel}>CAR:</Text>
              <Text>{item.driverInfo.carId}</Text>
            </View>
          </View>
          <View style={styles.col4}>
            <View style={ styles.row }>
              <Text style={styles.textLabel}>PICKUP:</Text>
              <Text>{item.distFromStartLocation + 'M'}</Text>
            </View>
          </View>
        </View>
      </React.Fragment>
    );
  }

  render() {
    if (!this.props.isLoading) {
      return (
        <ListView
          items={
            this.props.driversList.map(item => ({
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

const mapStateToProps = ({ isLoading, driversList }) => {
  return { isLoading, driversList };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(DriversListScreen);
