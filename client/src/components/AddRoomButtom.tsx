import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import style from '../styles/components/AddRoomButtom';

const AddRoomButtom = () => {
  return (
      <TouchableOpacity style={style.buttom}>
        <Text style={style.text}>New room</Text>
      </TouchableOpacity>
  );
};

export default AddRoomButtom;