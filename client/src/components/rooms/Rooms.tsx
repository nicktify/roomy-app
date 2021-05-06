import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { Context } from '../../context/MainContext';

import style from '../../styles/components/room';
import Room from './Room';

const Rooms = ({ selectedRooms }) => {

  const { ownedRooms, participantRooms } = useContext( Context );


  return (
    <>
    { 
      selectedRooms === 'createdRooms' ?
        ownedRooms?.map(room => (
          <View 
            style={{ width: '100%' }}
            key={room.id}
            >
            <Room
              name={room.name}
            />
          </View>
        ))
        : 
        participantRooms?.map(room => (
          <View 
            style={{ width: '100%' }}
            key={room.id}
          >
            <Room 
              name={room.name}
            />
          </View>
        ))
 
    }
    </>
  );
};

export default Rooms;