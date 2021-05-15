import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { CreateRoomTabNavigation, HomeTabNavigation, NotificationsTabNavigation, ProfileTabNavigation, RoomNavigation } from './ButtomTabNavigation';
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
      {/* <Drawer.Screen name="CreateRoom" component={ CreateRoomTabNavigation } />
      <Drawer.Screen name="Profile" component={ ProfileTabNavigation } />
      <Drawer.Screen name="Notifications" component={ NotificationsTabNavigation } /> */}
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;