import React, { useContext, useState } from 'react';
import { Dimensions, Modal, Pressable, Text, View } from 'react-native';
import AddRoomButtom from '../components/buttoms/AddRoomButtom';
import SelectRooms from '../components/buttoms/SelecRooms';

import HomeLeftTopComponent from '../components/HomeLeftTopComponent';
import HomeRightTopComponent from '../components/HomeRightTopComponent';
import Rooms from '../components/rooms/Rooms';

import style from '../styles/screens/home';
import { style as ModalStyles } from '../styles/components/modal';
import { Context } from '../context/MainContext';


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
    .then(result => {
      console.log(result)
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
        <View style={style.bottomContainer}>
          <View style={style.innerButtomContainer} >
            <View style={{ width: '100%', alignItems: 'center', marginBottom: 20, }}>
              <SelectRooms
                selectedRooms={ selectedRooms }
                setSelectedRooms={ setSelectedRooms }
              />
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