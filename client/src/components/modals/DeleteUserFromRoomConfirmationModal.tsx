import React, { useContext } from 'react';
import { Dimensions, Modal, Text, TouchableOpacity, View } from 'react-native';
import { Context } from '../../context/MainContext';
import { style as modalStyles } from '../../styles/components/modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
    <View
      style={{ flex: 1, backgroundColor: 'black', opacity: 0.5, position: 'absolute', width: windowWidth, height: windowHeight }}
    >
    </View>
    <View style={modalStyles.centeredView}>
      <View style={modalStyles.modalView}>

        <Text style={{ fontSize: 18, fontWeight: 'bold', opacity: 0.8 }}>Are you sure you want to delete the user from this room?</Text>
        <TouchableOpacity
          style={{
            width: 200,
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
            opacity: confirmationDisabledButton ? 0.5 : 1
          }}
          onPress={handleDeleteUser}
        >
          <Text style={{
            color: 'white',
            opacity: 0.9,
            fontWeight: "bold",
            textAlign: "center",
          }}>Yes, delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={modalStyles.button}
          onPress={() => setShowModalConfirmationDelete(!showModalConfirmationDelete)}
        >
          <Text style={modalStyles.textStyle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  );
};

export default DeleteUserFromRoomConfirmationModal;