import * as React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './src/navigation/DrawerNavigation';

const App = (): JSX.Element => {

  return (
    <>
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
    </>
  );
};

export default App;
