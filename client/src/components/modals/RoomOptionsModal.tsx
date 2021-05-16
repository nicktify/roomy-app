import React from 'react';
import { Dimensions, Modal, Pressable, Text, View } from 'react-native';

import { style as ModalStyles } from '../../styles/components/modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RoomOptionsModal = ({ modalRoomOptions, setModalRoomOptions, setModalConfirmationDeleteRoom, modalConfirmationDeleteRoom, handleDeleteRoom }: any) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalRoomOptions}
        onRequestClose={() => {
          setModalRoomOptions(false);
        }}
      >
        <View style={{ position: 'absolute', backgroundColor: 'black', opacity: 0.5, width: windowWidth, height: windowHeight }}></View>
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
              <Text style={{ fontSize: 20, fontWeight: 'bold', opacity: 0.7 }}>Delete room</Text>
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
              <Text style={{ fontSize: 20, fontWeight: 'bold', opacity: 0.7 }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Confirmation delete */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalConfirmationDeleteRoom}
        onRequestClose={() => {
          setModalConfirmationDeleteRoom(false);
        }}
      >
        <View
          style={ModalStyles.centeredView}
        >
          <View
            style={ModalStyles.modalView}
          >
            <Text style={{ fontSize: 18, marginBottom: 15, }}>Are you sure yo want to delete the room. Once you deleted the room you cannot restore it.</Text>
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
              onPress={handleDeleteRoom}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold', opacity: 0.9, color: 'white' }}>Yes, delete</Text>
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
              onPress={() => setModalConfirmationDeleteRoom(false)}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold', opacity: 0.7 }}>cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RoomOptionsModal;