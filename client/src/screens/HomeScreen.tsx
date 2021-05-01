import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
  return (
    <>
      <View style={style.root}>
        <View style={style.topContainer}>
          <View style={style.leftTopContainer}>

          </View>
          <View style={style.rightTopContainer}>

          </View>
        </View>
        <View 
          style={style.bottomContainer}
          ></View>
      </View>
    </>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white'
  },
  topContainer: {
    flex: 0.3,
    flexDirection: 'row'
  },
  leftTopContainer: {
    flex: 1,
  },
  rightTopContainer: {
    flex: 1,
  },
  bottomContainer: {
    flex: 0.7,
    backgroundColor: 'black',
    opacity: 0.04,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  }
})