import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

function ButtomTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={ HomeScreen } />
      <Tab.Screen name="Calendar" component={ CalendarScreen } />
      <Tab.Screen name="Notifications" component={ NotificationsScreen } />
      <Tab.Screen name="Search" component={ SearchScreen } />
    </Tab.Navigator>
  );
}

export default ButtomTabNavigation;