import React, { useContext } from 'react';
import { Image, Modal, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { principalColor } from '../../config/colors';
import { Context } from '../../context/MainContext';
import { style as modalStyles } from '../../styles/modals/modal';
import Background from '../Background';
import styles from '../../styles/modals/userRoomOption';


const UserOnRoomOptionModal = ({ showModalUserOption, setShowModalUserOption, selectedUser, setShowModalConfirmationDelete, }: any) => {

  const { selectedRoom, makeUserOwnerOfRoom, makeUserParticipantOfRoom } = useContext(Context);

  const handleMakeUserOwner = () => {
    selectedUser && makeUserOwnerOfRoom(selectedUser.id)
      .then(() => {
        setShowModalUserOption(false);
      })
      .catch(error => {
        setShowModalUserOption(false);
        console.log(error);
      });
  };

  const handleMakeUserParticipant = () => {
    selectedUser && makeUserParticipantOfRoom(selectedUser.id)
      .then(() => {
        setShowModalUserOption(false);
      })
      .catch(error => {
        setShowModalUserOption(false);
        console.log(error);
      });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModalUserOption}
      onRequestClose={() => {
        setShowModalUserOption(!showModalUserOption);
      }}
    >

    <Background />

    <View style={modalStyles.centeredView}>
      <View style={modalStyles.modalView}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            {
              selectedUser?.profilePicture ?
                <Image
                  style={styles.image}
                  source={{ uri: selectedUser.profilePicture }}
                  width={40}
                  height={40}
                />
                :
                <Icon name='account-circle' size={40} color={principalColor}/>
            }
          </View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', opacity: 0.8 }}>{selectedUser?.name}</Text>
        </View>
          {
            selectedUser && selectedRoom && selectedRoom.participants.includes(selectedUser.id) ?
              <TouchableOpacity
                style={modalStyles.button}
                onPress={handleMakeUserOwner}
              >
                <Text style={modalStyles.textStyle}>Make owner</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
                style={modalStyles.button}
                onPress={handleMakeUserParticipant}
              >
                <Text style={modalStyles.textStyle}>Remove as owner</Text>
              </TouchableOpacity>
          }
        <TouchableOpacity
          style={modalStyles.button}
          onPress={() => setShowModalConfirmationDelete(true)}
        >
          <Text style={modalStyles.textStyle}>Delete user from room</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={modalStyles.button}
          onPress={() => setShowModalUserOption(!showModalUserOption)}
        >
          <Text style={modalStyles.textStyle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  );
};

export default UserOnRoomOptionModal;
