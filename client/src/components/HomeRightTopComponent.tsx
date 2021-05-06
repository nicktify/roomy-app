import React from 'react';
import { Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { principalColor } from '../config/colors';
import style from '../styles/components/homeRightTop';

const HomeRightTopComponent = () => {
  return (
    <>
      <View style={style.rightTopContainer}>
        <Image
          style={{ resizeMode: 'contain', position: 'absolute', alignSelf: 'flex-end', top: -10, right: 15 }}
          source={require('../assets/roomy.png')}
          width={50}
          height={50}
        />
        <Icon
          style={style.profileImage}
          name="account-circle"
          size={65}
          color={principalColor}
        />
      </View>
    </>
  );
};

export default HomeRightTopComponent;