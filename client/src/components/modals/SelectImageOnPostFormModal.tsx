import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { style as modalStyles } from '../../styles/modals/modal';
import Background from '../Background';

const SelectImageOnPostFormModal = ({
  modalPictureVisible,
  setModalPictureVisible,
  handleUploadImage,
  handleTakePicture
}: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalPictureVisible}
      onRequestClose={() => {
        setModalPictureVisible(!modalPictureVisible);
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
          onPress={() => setModalPictureVisible(!modalPictureVisible)}
        >
          <Text style={modalStyles.textStyle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  );
};

export default SelectImageOnPostFormModal;
