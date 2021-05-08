import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { Context } from '../../context/MainContext';

const RoomPostsScreen = () => {

  const { selectedRoom } = useContext( Context );

  console.log(selectedRoom);

  return (
    <View>
      <Text>Room posts screen</Text>
    </View>
  );
};

export default RoomPostsScreen;