import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MapScreen from '../screens/passenger/MapScreen';
import DriversList from "../screens/passenger/DriversListScreen";
import ChatScreen from "../screens/ChatScreen";

const MapStack = createStackNavigator({
    Map: MapScreen,
});

MapStack.navigationOptions = {
    tabBarLabel: 'Passenger route',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-car${focused ? '' : '-outline'}` : 'md-car'}
        />
    ),
};

const DriversListStack = createStackNavigator({
    DriversList: DriversList,
});

DriversListStack.navigationOptions = {
    tabBarLabel: 'Routes',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-list-box${focused ? '' : '-outline'}` : 'md-list-box'}
        />
    ),
};

const ChatListStack = createStackNavigator({
    ChatScreen: ChatScreen,
});

ChatListStack.navigationOptions = {
    tabBarLabel: 'Chat',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-chatboxes${focused ? '' : '-outline'}` : 'md-chatboxes'}
        />
    ),
};

export default createBottomTabNavigator({
    MapStack,
    DriversListStack,
    ChatListStack,
});
