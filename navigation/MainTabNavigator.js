import React from 'react';
import { Platform } from 'react-native';
import {
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ChatsScreen from '../screens/ChatsScreen';
import ChatScreen from '../screens/ChatScreen';
import SettingsScreen from '../screens/SettingsScreen';

const ChatsStack = createStackNavigator({
    Chats: ChatsScreen,
    Chat: ChatScreen
});

ChatsStack.navigationOptions = {
    tabBarLabel: 'Chats',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? 'ios-chatbubbles'
                    : 'md-chatbubbles'
            }
        />
    )
};

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'
            }
        />
    )
};

export default createBottomTabNavigator({
    ChatsStack,
    SettingsStack
});
