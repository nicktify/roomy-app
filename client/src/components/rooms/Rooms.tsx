import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context } from '../../context/MainContext';

import Room from './Room';

const Rooms = ({ selectedRooms, navigation, setModalRoomOptions, setSelectedRoomId }: any) => {

  const { ownedRooms, participantRooms } = useContext( Context );

  useEffect(() => {}, [ownedRooms, participantRooms])

  const renderItem = ({ item }: any) => (
    <View style={{ width: '100%' , alignItems: 'center'}}>
      <Room name={item.name} id={item.id} navigation={ navigation } setModalRoomOptions={setModalRoomOptions} setSelectedRoomId={setSelectedRoomId}/>
    </View>
  )


  return (
      <SafeAreaView style={{ width: '100%', flex: 1 }}>
      <FlatList
        data={selectedRooms === 'createdRooms' ? ownedRooms : participantRooms}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default Rooms;