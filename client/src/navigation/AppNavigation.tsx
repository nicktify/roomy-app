import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigation from './DrawerNavigation';
import LoadingScreen from '../screens/LoadingScreen';
import { Context } from '../context/MainContext';
import AuthNavigation from './AuthNavigation';

const Stack = createStackNavigator();

const AppNavigation = () => {

  const { validationCompleted, user } = React.useContext( Context );

  if ( ! validationCompleted ) return <LoadingScreen />

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
          user ? 
                  <Stack.Screen name="HomeNavigation" component={ DrawerNavigation } />
               :
                  <Stack.Screen name="AuthNavigation" component={ AuthNavigation } />
        }
      </Stack.Navigator>
  );
};

export default AppNavigation;