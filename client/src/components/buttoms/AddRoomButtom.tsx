import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import style from '../../styles/components/AddRoomButtom';

const AddRoomButtom = ({ navigation }: any) => {
  return (
      <TouchableOpacity 
        onPress={() => navigation.navigate('CreateRoom')}
        style={style.buttom}
        >
        <Text style={style.text}>New room</Text>
      </TouchableOpacity>
  );
};

export default AddRoomButtom;