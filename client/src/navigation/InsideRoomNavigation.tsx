import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import TabBarRoomNavigation from '../components/TabBarNavigation';
import RoomHomeScreen from '../screens/room/RoomHomeScreen';

const Tab = createMaterialTopTabNavigator();

const InsideRoomNavigation = () => {
  return (
    <Tab.Navigator tabBar={ props => <TabBarRoomNavigation { ...props } /> }>
    <Tab.Screen name="Home" component={ RoomHomeScreen } />
  </Tab.Navigator>
  );
};

export default InsideRoomNavigation;