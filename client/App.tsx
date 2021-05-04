import * as React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import AppContext from './src/context/MainContext';

const App = (): JSX.Element => {

  return (
    <NavigationContainer>
      <AppContext>
        <AppNavigation />
      </AppContext>
    </NavigationContainer>
  );
};

export default App;
