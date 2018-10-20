import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MapScreen from '../screens/driver/MapScreen';

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

export default createBottomTabNavigator({
  MapStack,
});
