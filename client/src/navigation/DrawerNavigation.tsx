import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { HomeTabNavigation } from './ButtomTabNavigation';
import { Context } from '../context/MainContext';
import MessageScreen from '../screens/MessageScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {

  const { logout } = useContext(Context);

  const handleLogout = () => {
    logout();
  };

  return (
    <Drawer.Navigator initialRouteName="Home"
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={ handleLogout } />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen name="Home" component={ HomeTabNavigation } />
      <Drawer.Screen name="Message" component={ MessageScreen } />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;