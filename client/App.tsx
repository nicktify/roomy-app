import * as React from 'react';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/navigation/StackNavigation';

const App = (): JSX.Element => {

  return (
    <>
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
    </>
  );
};

export default App;
