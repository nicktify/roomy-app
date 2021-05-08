import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { CalendarTabNavigation, CreateRoomNavigation, HomeTabNavigation, NotificationsTabNavigation, RoomNavigation, SearchTabNavigation } from './ButtomTabNavigation';
import { Context } from '../context/MainContext';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {

  const { logout } = React.useContext( Context );

  const handleLogout = () => {
    logout();
  }

  return (
    <Drawer.Navigator initialRouteName="Home"
      drawerContent={ props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={ handleLogout } />
          </DrawerContentScrollView>
        )
      }}
    >
      <Drawer.Screen name="Home" component={ HomeTabNavigation } />
      <Drawer.Screen name="Calendar" component={ CalendarTabNavigation } />
      <Drawer.Screen name="Notifications" component={ NotificationsTabNavigation } />
      <Drawer.Screen name="Search" component={ SearchTabNavigation } />
      <Drawer.Screen name="CreateRoom" component={ CreateRoomNavigation } />
      <Drawer.Screen name="Room" component={ RoomNavigation } />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;