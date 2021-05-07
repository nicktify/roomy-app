import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { Context } from '../../context/MainContext';

import Room from './Room';

const Rooms = ({ selectedRooms }: any) => {

  const { ownedRooms, participantRooms } = useContext( Context );

  useEffect(() => {}, [ownedRooms, participantRooms])

  return (
    <>
      { 
        selectedRooms === 'createdRooms' 
          ?
            ownedRooms?.map(room => (
              <View style={{ width: '100%' }} key={room.id} >
                <Room name={room.name} />
              </View>
            ))
          : 
            participantRooms?.map(room => (
              <View style={{ width: '100%' }} key={room.id} >
                <Room name={room.name} />
              </View>
            ))
      }
    </>
  );
};

export default Rooms;