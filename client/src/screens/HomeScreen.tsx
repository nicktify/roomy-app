import React, { useContext, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Context } from '../context/MainContext';
import HomeLeftTopComponent from '../components/HomeLeftTopComponent';
import HomeRightTopComponent from '../components/HomeRightTopComponent';
import Rooms from '../components/rooms/Rooms';
import RoomOptionsModal from '../components/modals/RoomOptionsModal';

const HomeScreen = ({ navigation }: any) => {

  const { deleteRoom } = useContext(Context);

  const [modalRoomOptions, setModalRoomOptions] = useState(false);
  const [modalConfirmationDeleteRoom, setModalConfirmationDeleteRoom] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');

  const handleDeleteRoom = () => {
    deleteRoom(selectedRoomId)
      .then(() => {
        setModalConfirmationDeleteRoom(false);
        setModalRoomOptions(false);
        setSelectedRoomId('');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: 'white'
    }}>
      <View style={{
        flex: 0.3,
        flexDirection: 'row'
      }}>
        <HomeLeftTopComponent navigation={navigation} />
        <HomeRightTopComponent />
      </View>
      <View style={{
        flex: 1,
        backgroundColor: '#f1f1f1',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.44,
        shadowRadius: 5,
        elevation: 16,
      }}>
        <View style={{
          height: '100%',
          alignItems: 'center',
          paddingHorizontal: 10,
        }} >
          <View style={{
            width: '80%',
            alignItems: 'center',
            marginBottom: 10,
            borderBottomColor: '#a4a4a4a4',
            borderBottomWidth: 0.5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', opacity: 0.8, }}>Your rooms</Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('SearchRoom')}
            >
              <Text>Search</Text>
              <Icon
                name='search'
                size={30}
                style={{
                  opacity: 0.8,
                  marginLeft: 5,
                }}
              />
            </TouchableOpacity>
          </View>
          <Rooms
            navigation={navigation}
            setModalRoomOptions={setModalRoomOptions}
            setSelectedRoomId={setSelectedRoomId}
          />
        </View>
      </View>

      <RoomOptionsModal 
        modalRoomOptions={modalRoomOptions}
        setModalRoomOptions={setModalRoomOptions}
        setModalConfirmationDeleteRoom={setModalConfirmationDeleteRoom}
        modalConfirmationDeleteRoom={modalConfirmationDeleteRoom}
        handleDeleteRoom={handleDeleteRoom}
      />

    </View>
  );
};

export default HomeScreen;