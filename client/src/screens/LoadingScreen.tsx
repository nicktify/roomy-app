import React from 'react';
import { Image, Text, View } from 'react-native';

const LoadingScreen = () => {
  return (
    <>
      <View
        style={{ flex: 1, alignItems: 'center' }}
      >
        <Image
          style={{ flex: 1, resizeMode: 'contain' }}
          source={require('../assets/roomy.png')}
          width={250}
          height={250}
        />
      </View>
    </>
  );
};

export default LoadingScreen;