import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TabBarRoomNavigation from '../components/TabBarRoomNavigation';
import ForumScreen from '../screens/rooms/ForumScreen';
import PeopleScreen from '../screens/rooms/PeopleScreen';
import RoomPostsScreen from '../screens/rooms/RoomPostsScreen';

const Tab = createMaterialTopTabNavigator();

const InsideRoomNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={props => <TabBarRoomNavigation {...props} />}
      initialRouteName="HomeRoomScreen"
    >
      <Tab.Screen name="HomeRoomScreen" component={RoomPostsScreen} />
      <Tab.Screen name="BooksRoomScreen" component={ForumScreen} />
      <Tab.Screen name="PeopleRoomScreen" component={PeopleScreen} />
    </Tab.Navigator>
  );
};

export default InsideRoomNavigation;