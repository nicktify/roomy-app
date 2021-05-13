import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import TabBarRoomNavigation from '../components/TabBarRoomNavigation';
import ForumScreen from '../screens/room/ForumScreen';
import PeopleScreen from '../screens/room/PeopleScreen';
import RoomPostsScreen from '../screens/room/RoomPostsScreen';

const Tab = createMaterialTopTabNavigator();

const InsideRoomNavigation = () => {
  return (
    <Tab.Navigator 
      tabBar={ props => <TabBarRoomNavigation { ...props } />}
      initialRouteName="HomeRoomScreen"
      >
    <Tab.Screen name="HomeRoomScreen" component={ RoomPostsScreen } />
    <Tab.Screen name="BooksRoomScreen" component={ ForumScreen } />
    <Tab.Screen name="PeopleRoomScreen" component={ PeopleScreen } />
  </Tab.Navigator>
  );
};

export default InsideRoomNavigation;