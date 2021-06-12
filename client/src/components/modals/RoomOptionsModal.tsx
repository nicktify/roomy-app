import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../styles/modals/roomOption';
import { style as ModalStyles } from '../../styles/modals/modal';
import Background from '../Background';

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
        <Background />
        <View style={ModalStyles.centeredView}>
          <View style={ModalStyles.modalView}>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => setModalConfirmationDeleteRoom(true)}
            >
              <Text style={styles.text}>Delete room</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => setModalRoomOptions(false)}
            >
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
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
        <View style={ModalStyles.centeredView}>
          <View style={ModalStyles.modalView}>
            <Text style={{ fontSize: 18, marginBottom: 15, }}>Are you sure yo want to delete the room. Once you deleted the room you cannot restore it.</Text>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={handleDeleteRoom}
            >
              <Text style={styles.yesDeleteText}>Yes, delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => setModalConfirmationDeleteRoom(false)}
            >
              <Text style={styles.text}>cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RoomOptionsModal;
