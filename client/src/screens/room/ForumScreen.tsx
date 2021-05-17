import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { Context } from '../../context/MainContext';

const ForumScreen = () => {
  const { selectedRoom } = useContext(Context);

  return (
    <View>
      <Text>Forum Screen</Text>
    </View>
  );
};

export default ForumScreen;