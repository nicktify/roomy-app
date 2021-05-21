import React from 'react';
import { Dimensions, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { style as modalStyles } from '../../styles/components/modal';
import SocialMediaIcon from '../SocialMediaIcon';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
    <View
      style={{ flex: 1, backgroundColor: 'black', opacity: 0.5, position: 'absolute', width: windowWidth, height: windowHeight }}
    >
    </View>
    <View style={modalStyles.centeredView}>
      <View style={modalStyles.modalView}>
        <SocialMediaIcon name={selectedSocialMediaIcon} size={30}/>
        <TextInput
          style={{
            color: 'black',
            backgroundColor: '#f1f1f1f1',
            width: windowWidth * 0.75,
            borderRadius: 20,
            marginBottom: 20,
          }}
          placeholder='https://www.socialmegia.com/miperfil'
          placeholderTextColor='#a1a1a1a1'
          onChangeText={(link) => setLink(link)}
          value={link}
          defaultValue={link}
        />
        <TouchableOpacity
          style={{
            width: 200,
            borderRadius: 20,
            padding: 10,
            margin: 10,
            backgroundColor: 'white',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
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