import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import NotificationsScreen from '../screens/UsersScreen';
import SearchScreen from '../screens/SearchScreen';

import TabBarNavigation from '../components/TabBarNavigation';
import CreateRoomScreen from '../screens/CreateRoomScreen';
import InsideRoomNavigation from './InsideRoomNavigation';

const Tab = createBottomTabNavigator();

export const HomeTabNavigation = () => {
  return (
    <Tab.Navigator tabBar={ props => <TabBarNavigation { ...props } /> }>
      <Tab.Screen name="Home" component={ HomeScreen } />
    </Tab.Navigator>
  );
}

export const CreateRoomTabNavigation = () => {
  return (
    <Tab.Navigator tabBar={ props => <TabBarNavigation { ...props } /> }>
      <Tab.Screen name="Calendar" component={ CreateRoomScreen } />
    </Tab.Navigator>
  );
}

export const NotificationsTabNavigation = () => {
  return (
    <Tab.Navigator tabBar={ props => <TabBarNavigation { ...props } /> }>
      <Tab.Screen name="Notifications" component={ NotificationsScreen } />
    </Tab.Navigator>
  );
}

export const SearchTabNavigation = () => {
  return (
    <Tab.Navigator tabBar={ props => <TabBarNavigation { ...props } /> }>
      <Tab.Screen name="Search" component={ SearchScreen } />
    </Tab.Navigator>
  );
}

export const CreateRoomNavigation = () => {
  return (
    <Tab.Navigator tabBar={ props => <TabBarNavigation { ...props } /> }>
      <Tab.Screen name="CreateRoom" component={ CreateRoomScreen } />
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