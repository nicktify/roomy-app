import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SearchScreen from '../screens/SearchScreen';

import TabBarNavigation from '../components/TabBarNavigation';
import CreateRoomScreen from '../screens/CreateRoomScreen';

const Tab = createBottomTabNavigator();

export const HomeTabNavigation = () => {
  return (
    <Tab.Navigator tabBar={ props => <TabBarNavigation { ...props } /> }>
      <Tab.Screen name="Home" component={ HomeScreen } />
    </Tab.Navigator>
  );
}

export const CalendarTabNavigation = () => {
  return (
    <Tab.Navigator tabBar={ props => <TabBarNavigation { ...props } /> }>
      <Tab.Screen name="Calendar" component={ CalendarScreen } />
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
      <Tab.Screen name="CreateRooom" component={ CreateRoomScreen } />
    </Tab.Navigator>
  );
}