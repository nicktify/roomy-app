import React from 'react';
import { Text, View } from 'react-native';

import style from '../styles/components/room';

const Room = () => {
  return (
    <>
      <View style={style.roomContainer}>
        <Text style={style.roomName}>Room name</Text>
        <Text style={style.roomDescription}>Room description</Text>
      </View>
    </>
  );
};

export default Room;