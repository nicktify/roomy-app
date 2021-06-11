import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import styles from '../../styles/modals/confirmationDeleteRoom';

const ConfirmationDeleteRoomModal = ({ modalConfirmationDeleteRoom, setModalConfirmationDeleteRoom,handleDeleteRoom }: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalConfirmationDeleteRoom}
      onRequestClose={() => {
        setModalConfirmationDeleteRoom(false);
      }}
    >
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.areYouSureText}>Are you sure yo want to delete the room. Once you deleted the room you cannot restore it.</Text>
        <Pressable style={styles.yesDeleteButton} onPress={handleDeleteRoom}>
          <Text style={styles.yesDeleteButtonText}>Yes, delete</Text>
        </Pressable>
        <Pressable style={styles.cancelButton} onPress={() => setModalConfirmationDeleteRoom(false)}>
          <Text style={styles.cancelButtonText}>cancel</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
  );
};

export default ConfirmationDeleteRoomModal;