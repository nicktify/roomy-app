import React from 'react';
import { Dimensions, Modal, Pressable, Text, View } from 'react-native';

import { style as modalStyles } from '../../styles/components/modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SelectImageOnPostFormModal = ({modalPictureVisible, setModalPictureVisible, handleUploadImage, handleTakePicture}: any) => {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalPictureVisible}
    onRequestClose={() => {
      setModalPictureVisible(!modalPictureVisible);
    }}
  >
    <View
      style={{ flex: 1, backgroundColor: 'black', opacity: 0.5, position: 'absolute', width: windowWidth, height: windowHeight }}
    >
    </View>
    <View style={modalStyles.centeredView}>
      <View style={modalStyles.modalView}>
        <Pressable
          style={modalStyles.button}
          onPress={handleUploadImage}
        >
          <Text style={modalStyles.textStyle}>Select from galery</Text>
        </Pressable>
        <Pressable
          style={modalStyles.button}
          onPress={handleTakePicture}
        >
          <Text style={modalStyles.textStyle}>Take picture</Text>
        </Pressable>
        <Pressable
          style={modalStyles.button}
          onPress={() => setModalPictureVisible(!modalPictureVisible)}
        >
          <Text style={modalStyles.textStyle}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
  );
};

export default SelectImageOnPostFormModal;