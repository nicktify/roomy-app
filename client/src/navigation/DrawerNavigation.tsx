import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CalendarTabNavigation, HomeTabNavigation, NotificationsTabNavigation, SearchTabNavigation } from './ButtomTabNavigation';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={ HomeTabNavigation } />
      <Drawer.Screen name="Calendar" component={ CalendarTabNavigation } />
      <Drawer.Screen name="Notifications" component={ NotificationsTabNavigation } />
      <Drawer.Screen name="Search" component={ SearchTabNavigation } />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;