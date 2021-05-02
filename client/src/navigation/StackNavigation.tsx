import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ButtomTabNavigation from './ButtomTabNavigation';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginScreen" component={ LoginScreen } />
      <Stack.Screen name="HomeScreen" component={ ButtomTabNavigation } />
      <Stack.Screen name="RegisterScreen" component={ RegisterScreen } />
    </Stack.Navigator>
  );
}

export default MyStack;