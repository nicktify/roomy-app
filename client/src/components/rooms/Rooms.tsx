import React, { useContext, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context } from '../../context/MainContext';

import Room from './Room';

const Rooms = ({ navigation, setModalRoomOptions, setSelectedRoomId, setSelectedRoomName }: any) => {

  const { rooms, getRooms } = useContext(Context);

  useEffect(() => { }, [rooms]);
  useEffect(() => { getRooms() }, [])

  const renderItem = ({ item }: any) => (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <Room
        name={item.name}
        id={item.id}
        navigation={navigation}
        setModalRoomOptions={setModalRoomOptions}
        setSelectedRoomId={setSelectedRoomId}
        setSelectedRoomName={setSelectedRoomName}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ width: '100%', flex: 1 }}>
      <FlatList
        data={rooms}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default Rooms;