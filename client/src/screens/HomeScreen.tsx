import React, { useContext, useState } from 'react';
import { Dimensions, Modal, Pressable, Text, View } from 'react-native';

import HomeLeftTopComponent from '../components/HomeLeftTopComponent';
import HomeRightTopComponent from '../components/HomeRightTopComponent';
import Rooms from '../components/rooms/Rooms';

import style from '../styles/screens/home';
import { style as ModalStyles } from '../styles/components/modal';
import { Context } from '../context/MainContext';
import Icon from 'react-native-vector-icons/MaterialIcons';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = ({ navigation }: any) => {

  const { deleteRoom } = useContext( Context );


  const [ selectedRooms, setSelectedRooms ] = useState('createdRooms');
  const [ modalRoomOptions, setModalRoomOptions ] = useState(false);
  const [ modalConfirmationDeleteRoom, setModalConfirmationDeleteRoom ] = useState(false);
  const [ selectedRoomId, setSelectedRoomId ] = useState('');

  const handleDeleteRoom = () => {
    deleteRoom(selectedRoomId)
    .then(() => {
      setModalConfirmationDeleteRoom(false);
      setModalRoomOptions(false);
      setSelectedRoomId('');
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <>
      <View style={style.root}>
        <View style={style.topContainer}>
          <HomeLeftTopComponent navigation={ navigation } />
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
              <Text style={{fontSize: 22, fontWeight: 'bold', opacity: 0.8, }}>Your rooms</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
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

              </View>
            </View>
            <Rooms
              navigation={ navigation }
              selectedRooms={ selectedRooms }
              setModalRoomOptions={setModalRoomOptions}
              setSelectedRoomId={setSelectedRoomId}
            />
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalRoomOptions}
          onRequestClose={() => {
            setModalRoomOptions(false)
          }}
        >
          <View style={{position: 'absolute', backgroundColor: 'black', opacity: 0.5, width: windowWidth, height: windowHeight}}></View>
          <View
          style={ModalStyles.centeredView}
          >
            <View
              style={ModalStyles.modalView}
            >
              <Pressable
                style={{
                  width: 200,
                  alignItems: 'center',
                  borderRadius: 20,
                  padding: 10,
                  margin: 10,
                  backgroundColor: 'white',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                onPress={() => setModalConfirmationDeleteRoom(true)}
              >
                <Text style={{fontSize: 20, fontWeight: 'bold', opacity: 0.7}}>Delete room</Text>
              </Pressable>
              <Pressable
                style={{
                  width: 200,
                  alignItems: 'center',
                  borderRadius: 20,
                  padding: 10,
                  margin: 10,
                  backgroundColor: 'white',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                onPress={() => setModalRoomOptions(false)}
              >
                <Text style={{fontSize: 20, fontWeight: 'bold', opacity: 0.7}}>Cancel</Text>
              </Pressable>

            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalConfirmationDeleteRoom}
          onRequestClose={() => {
            setModalConfirmationDeleteRoom(false)
          }}
        >

          <View
          style={ModalStyles.centeredView}
          >
            <View
              style={ModalStyles.modalView}
            >
              <Text style={{fontSize: 18, marginBottom: 15,}}>Are you sure yo want to delete the room. Once you deleted the room you cannot restore it.</Text>
              <Pressable
                style={{
                  width: 200,
                  alignItems: 'center',
                  borderRadius: 20,
                  padding: 10,
                  margin: 10,
                  backgroundColor: 'white',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                onPress={handleDeleteRoom}
              >
                <Text style={{fontSize: 20, fontWeight: 'bold', opacity: 0.7}}>Yes, delete</Text>
              </Pressable>
              <Pressable
                style={{
                  width: 200,
                  alignItems: 'center',
                  borderRadius: 20,
                  padding: 10,
                  margin: 10,
                  backgroundColor: 'red',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                onPress={() => setModalConfirmationDeleteRoom(false)}
              >
                <Text style={{fontSize: 20, fontWeight: 'bold', opacity: 0.9, color: 'white'}}>Cancel</Text>
              </Pressable>

            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default HomeScreen;