import * as React from 'react';

import LoginScreen from '../screens/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../screens/RegisterScreen';
import DrawerNavigation from './DrawerNavigation';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={ LoginScreen } />
        <Stack.Screen name="Register" component={ RegisterScreen } />
        <Stack.Screen name="HomeNavigation" component={ DrawerNavigation } />
      </Stack.Navigator>
    </>
  );
};

export default AppNavigation;