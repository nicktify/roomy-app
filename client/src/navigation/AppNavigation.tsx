import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from '../screens/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../screens/RegisterScreen';
import DrawerNavigation from './DrawerNavigation';
import { Context } from '../context/MainContext';

const Stack = createStackNavigator();

const AppNavigation = () => {

  const { user, validateToken } = React.useContext( Context );

  React.useEffect(() => {
    validateUser();
  }, [])

  const validateUser = async () => {
    
    const token = await AsyncStorage.getItem('token');
    if ( ! token ) return;

    validateToken(JSON.parse(token));

  }

  const navigation = () => {
    return (
      user 
      ? 
      <Stack.Screen name="HomeNavigation" component={ DrawerNavigation } />
      : 
      <>
        <Stack.Screen name="Login" component={ LoginScreen } />
        <Stack.Screen name="Register" component={ RegisterScreen } />
      </>
    )
  }

  return (
      <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
        { navigation() }
      </Stack.Navigator>
  );
};

export default AppNavigation;