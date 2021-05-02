import React from 'react';
import { View } from 'react-native';

import HomeLeftTopComponent from '../components/HomeLeftTopComponent';
import HomeRightTopComponent from '../components/HomeRightTopComponent';
import Room from '../components/Room';

import style from '../styles/screens/home';

const HomeScreen = ({ navigation }: any) => {
  return (
    <>
      <View style={style.root}>
        <View style={style.topContainer}>
          <HomeLeftTopComponent navigation={ navigation } />
          <HomeRightTopComponent />
        </View>
        <View style={style.bottomContainer}>
          <View style={style.innerButtomContainer} >
            <Room />
          </View>
        </View>
      </View>
    </>
  );
};




export default HomeScreen;