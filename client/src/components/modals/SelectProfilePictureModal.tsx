import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { style as modalStyles } from '../../styles/modals/modal';
import Background from '../Background';

const SelectProfilePictureModal = ({
  modalVisible,
  setModalVisible,
  handleUploadImage,
  handleTakePicture
}: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
    <Background />
    <View style={modalStyles.centeredView}>
      <View style={modalStyles.modalView}>
        <TouchableOpacity
          style={modalStyles.button}
          onPress={handleUploadImage}
        >
          <Text style={modalStyles.textStyle}>Select from galery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={modalStyles.button}
          onPress={handleTakePicture}
        >
          <Text style={modalStyles.textStyle}>Take picture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={modalStyles.button}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={modalStyles.textStyle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  );
};

export default SelectProfilePictureModal;
