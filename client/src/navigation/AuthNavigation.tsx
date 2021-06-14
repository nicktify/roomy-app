import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
      <Stack.Navigator initialRouteName={ 'Login' } screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={ LoginScreen } />
        <Stack.Screen name="Register" component={ RegisterScreen } />
        <Stack.Screen name="ForgotPassword" component={ ForgotPasswordScreen } />
      </Stack.Navigator>
  );
};

export default AuthNavigation;