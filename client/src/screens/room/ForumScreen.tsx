import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { Context } from '../../context/MainContext';

const ForumScreen = () => {
  const { selectedRoom } = useContext(Context);

  return (
    <View>
      <View>
        <Text style={{
          fontSize: 22,
          fontWeight: 'bold',
          opacity: 0.8,
          alignSelf: 'center',
          marginTop: 10,
        }}>
          {selectedRoom?.name}
        </Text>
      </View>
      <Text>Forum Screen</Text>
    </View>
  );
};

export default ForumScreen;