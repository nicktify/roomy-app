import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginScreen" component={ LoginScreen } />
      <Stack.Screen name="RegisterScreen" component={ RegisterScreen } />
    </Stack.Navigator>
  );
}

export default MyStack;