import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import style from '../styles/components/homeRightTop';

const HomeRightTopComponent = () => {
  return (
    <>
      <View style={style.rightTopContainer}>
        <Icon
          style={style.profileImage}
          name="account-circle"
          size={50}
          color="#69C1AC"
        />
      </View>
    </>
  );
};

export default HomeRightTopComponent;