import React from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { style as modalStyles } from '../../styles/modals/modal';
import { styles } from '../../styles/modals/changeSocialMedia';
import SocialMediaIcon from '../SocialMediaIcon';

const ChangeSocialMediaModal = ({
  showModalChangeSocialMedia,
  setShowModalChangeSocialMedia,
  selectedSocialMediaIcon,
  link,
  setLink,
  handleChangeSocialLink,
}: any) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModalChangeSocialMedia}
      onRequestClose={() => {
        setShowModalChangeSocialMedia(!showModalChangeSocialMedia);
      }}
    >
    <View style={styles.container}></View>
    <View style={modalStyles.centeredView}>
      <View style={modalStyles.modalView}>
        <SocialMediaIcon name={selectedSocialMediaIcon} size={30} />
        <TextInput
          style={styles.textInput}
          placeholder='https://www.socialmegia.com/miperfil'
          placeholderTextColor='#a1a1a1a1'
          onChangeText={(link) => setLink(link)}
          value={link}
          defaultValue={link}
        />
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={handleChangeSocialLink}
        >
          <Text style={modalStyles.textStyle}>OK</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={modalStyles.button}
          onPress={() => setShowModalChangeSocialMedia(!showModalChangeSocialMedia)}
        >
          <Text style={modalStyles.textStyle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  );
};

export default ChangeSocialMediaModal;
