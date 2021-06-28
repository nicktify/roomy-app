import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import TabBarNavigation from '../components/TabBarNavigation';
import CreateRoomScreen from '../screens/forms/CreateRoomScreen';
import InsideRoomNavigation from './InsideRoomNavigation';

const Tab = createBottomTabNavigator();

export const HomeTabNavigation = () => {
  return (
    <Tab.Navigator tabBar={ props => <TabBarNavigation { ...props } /> }>
      <Tab.Screen name="Home" component={ HomeScreen } />
      <Tab.Screen name="CreateRoom" component={ CreateRoomScreen } />
      <Tab.Screen name="Profile" component={ ProfileScreen } />
      <Tab.Screen name="Notifications" component={ NotificationsScreen } />
    </Tab.Navigator>
  );
}

export const RoomNavigation = () => {
  return (
    <Tab.Navigator tabBar={ props => <TabBarNavigation { ...props } /> }>
      <Tab.Screen name="Room" component={ InsideRoomNavigation } />
    </Tab.Navigator>
  );
}