import React, { useState } from 'react';
import { View } from 'react-native';
import AddRoomButtom from '../components/buttoms/AddRoomButtom';
import SelectRooms from '../components/buttoms/SelecRooms';

import HomeLeftTopComponent from '../components/HomeLeftTopComponent';
import HomeRightTopComponent from '../components/HomeRightTopComponent';
import Rooms from '../components/rooms/Rooms';

import style from '../styles/screens/home';

const HomeScreen = ({ navigation }: any) => {

  const [ selectedRooms, setSelectedRooms ] = useState('createdRooms');

  const selectedRoomsProps = {
    selectedRooms,
    setSelectedRooms
  }

  const roomsProps = {
    selectedRooms
  }

  return (
    <>
      <View style={style.root}>
        <View style={style.topContainer}>
          <HomeLeftTopComponent navigation={ navigation } />
          <HomeRightTopComponent />
        </View>
        <View style={style.bottomContainer}>
          <View style={style.innerButtomContainer} >
            <View style={{ width: '100%', alignItems: 'center' }}>
              <AddRoomButtom />
              <SelectRooms
                {...selectedRoomsProps}
              />
            </View>
            <Rooms 
              {...roomsProps}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default HomeScreen;