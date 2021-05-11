import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import TabBarRoomNavigation from '../components/TabBarRoomNavigation';
import ForumScreen from '../screens/room/ForumScreen';
import DatesScreen from '../screens/room/DatesScreen';
import LinksScreen from '../screens/room/LinksScreen';
import RoomPostsScreen from '../screens/room/RoomPostsScreen';

const Tab = createMaterialTopTabNavigator();

const InsideRoomNavigation = () => {
  return (
    <Tab.Navigator 
      tabBar={ props => <TabBarRoomNavigation { ...props } />}
      initialRouteName="HomeRoomScreen"
      >
    <Tab.Screen name="HomeRoomScreen" component={ RoomPostsScreen } />
    <Tab.Screen name="LinksRoomScreen" component={ LinksScreen } />
    <Tab.Screen name="BooksRoomScreen" component={ ForumScreen } />
    <Tab.Screen name="DatesRoomScreen" component={ DatesScreen } />
  </Tab.Navigator>
  );
};

export default InsideRoomNavigation;