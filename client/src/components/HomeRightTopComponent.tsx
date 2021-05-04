import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { principalColor } from '../config/colors';
import style from '../styles/components/homeRightTop';

const HomeRightTopComponent = () => {
  return (
    <>
      <View style={style.rightTopContainer}>
        <Icon
          style={style.profileImage}
          name="account-circle"
          size={50}
          color={principalColor}
        />
      </View>
    </>
  );
};

export default HomeRightTopComponent;