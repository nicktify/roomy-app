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
      backgroundColor: 'white',
      flex: 1,
    }}>
      <View style={{
        flex: 0.3,
        flexDirection: 'row',
      }}>
        <HomeLeftTopComponent navigation={navigation} />
        <HomeRightTopComponent />
      </View>
      <View style={{
        flex: 1,
        backgroundColor: '#f1f1f1',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        elevation: 16,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.44,
        shadowRadius: 5,
      }}>
        <View style={{
          alignItems: 'center',
          height: '100%',
          paddingHorizontal: 10,
        }} >
          <View style={{
            alignItems: 'center',
            borderBottomColor: '#a4a4a4a4',
            borderBottomWidth: 0.5,
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '80%',
          }}>
            <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              opacity: 0.8, }}
            >
                Your rooms
            </Text>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}
              onPress={() => navigation.navigate('SearchRoom')}
            >
              <Text>Search</Text>
              <Icon
                name='search'
                size={30}
                style={{
                  marginLeft: 5,
                  opacity: 0.8,
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