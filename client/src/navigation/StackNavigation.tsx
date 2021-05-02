import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
    </Stack.Navigator>
  );
}

export default MyStack;