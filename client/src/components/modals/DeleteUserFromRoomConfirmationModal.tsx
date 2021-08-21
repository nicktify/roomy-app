import React, { useContext } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { Context } from '../../context/MainContext';
import { style as modalStyles } from '../../styles/modals/modal';
import { styles } from '../../styles/modals/deleteUserFromRoomConfirmation';

const DeleteUserFromRoomConfirmationModal = ({
  showModalConfirmationDelete,
  setShowModalConfirmationDelete,
  confirmationDisabledButton,
  setConfirmationDisabledButton,
  selectedUser,
  setSelectedUser,
  fetchAllUsersFromRoom,
  setShowModalUserOption,
}: any) => {

  const { 
    selectedRoom,
    handleDeleteUserFromRoom,
  } = useContext(Context);

  const handleDeleteUser = () => {
    setConfirmationDisabledButton(true);
    selectedRoom && selectedUser && handleDeleteUserFromRoom(selectedRoom?.id, selectedUser.id)
      .then(() => {
        fetchAllUsersFromRoom();
        setSelectedUser(null);
        setShowModalConfirmationDelete(false);
        setShowModalUserOption(false);
        setConfirmationDisabledButton(false);
      })
      .catch(error => {
        console.log(error);
        setSelectedUser(null);
        setShowModalConfirmationDelete(false);
        setShowModalUserOption(false);
        setConfirmationDisabledButton(false);
      });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModalConfirmationDelete}
      onRequestClose={() => {
        setShowModalConfirmationDelete(!showModalConfirmationDelete);
      }}
    >
    <View style={styles.transparentBackground}></View>
    <View style={modalStyles.centeredView}>
      <View style={modalStyles.modalView}>
        <Text style={styles.areYouSureText}>Are you sure you want to delete the user from this room?</Text>
        <TouchableOpacity 
          style={[
            styles.touchableOpacity,
            { opacity: confirmationDisabledButton ? 0.5 : 1 }
          ]}
          onPress={handleDeleteUser}
        >
          <Text style={styles.confirmationText}>Yes, delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={modalStyles.button}
          onPress={() => setShowModalConfirmationDelete(!showModalConfirmationDelete)}
        >
          <Text style={modalStyles.textStyle}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  );
};

export default DeleteUserFromRoomConfirmationModal;
