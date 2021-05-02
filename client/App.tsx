import * as React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';

const App = (): JSX.Element => {

  return (
    <>
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
    </>
  );
};

export default App;
