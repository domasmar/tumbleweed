import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MapScreen from '../screens/driver/MapScreen';
import RoutesList from '../screens/driver/RoutesScreen';
import MyProfile from '../screens/driver/MyProfile';
import ChatScreen from "../screens/ChatScreen";

const MyProfileStack = createStackNavigator({
    Profile: MyProfile
});

MyProfileStack.navigationOptions = {
    tabBarLabel: 'My Profile',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-hammer${focused ? '' : '-outline'}` : 'md-hammer'}
        />
    ),
};

const MapStack = createStackNavigator({
    Map: MapScreen,
});

MapStack.navigationOptions = {
    tabBarLabel: 'New Route',
    tabBarIcon: ({focused}) => (
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
    MyProfile,
    MapStack,
    RoutesListStack,
    ChatListStack,
});
