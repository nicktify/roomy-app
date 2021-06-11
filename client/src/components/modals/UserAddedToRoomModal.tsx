import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import Background from '../Background';
import styles from '../../styles/modals/UserAddedToRoom';

const UserAddedToRoomModal = ({showUserAddedToRoomModal, setShowUserAddedToRoomModal, setShowProfilePreview, cleanSearchedUser, searchedUser }: any) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={showUserAddedToRoomModal}
      onRequestClose={() => {
        setShowUserAddedToRoomModal(!showUserAddedToRoomModal)
        setShowProfilePreview(null)
        cleanSearchedUser();
      }}
    >
      <Background />
    <View style={styles.container}>
      <View style={styles.userAddedSuccessText}>
        <Text>{`User ${searchedUser && searchedUser.name} added to room successfuly.`}</Text>
        <TouchableOpacity
          style={styles.okButton}
          onPress={() => {
            setShowUserAddedToRoomModal(false)
            setShowProfilePreview(null)
            cleanSearchedUser();
          }}
        >
          <Text style={styles.okButtonText}>Ok</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  );
};

export default UserAddedToRoomModal;