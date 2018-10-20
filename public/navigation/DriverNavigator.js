import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MapScreen from '../screens/driver/MapScreen';
import RoutesList from '../screens/driver/RoutesList';

const MapStack = createStackNavigator({
  Map: MapScreen,
});

MapStack.navigationOptions = {
    tabBarLabel: 'Driver Route',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-car${focused ? '' : '-outline'}` : 'md-car'}
        />
    ),
};

const RoutesListStack = createStackNavigator({
  RoutesList: RoutesList,
});

RoutesListStack.navigationOptions = {
  tabBarLabel: 'Routes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-list-box${focused ? '' : '-outline'}` : 'md-list-box'}
    />
  ),
};

export default createBottomTabNavigator({
  MapStack,
  RoutesListStack,
});
