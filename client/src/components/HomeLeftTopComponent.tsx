import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import style from '../styles/components/homeLeftTop';

const HomeLeftTopComponent = ({ navigation }: any) => {
  return (
    <>
      <View style={style.leftTopContainer}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
        >
          <Icon
            style={style.toggleIcon}
            name="menu"
            size={30}
            color="black"
          />
        </TouchableOpacity>
        <View style={style.welcomeMessage}>
          <Text style={style.helloText}>Hello, </Text>
          <Text style={style.nameText}>Name!</Text>
        </View>
        <Text style={style.happyLearningText}>Happy learning !</Text>
      </View>
    </>
  );
};

export default HomeLeftTopComponent;