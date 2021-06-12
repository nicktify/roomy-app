import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { style as modalStyles } from '../../styles/modals/modal';
import Background from '../Background';

const RegisterSuccessModal = ({modalRegisterSuccess, navigation, setModalRegisterSuccess}: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalRegisterSuccess}
    >
    <Background />
    <View style={modalStyles.centeredView}>
      <View style={modalStyles.modalView}>
        <Text>You have been registered successfuly. Please, check your email inbox and confirm your email.</Text>
        <Pressable
          style={modalStyles.button}
          onPress={() => {
            navigation.navigate('Login');
            setModalRegisterSuccess(false);
          }}
        >
          <Text style={modalStyles.textStyle}>Login</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
  );
};

export default RegisterSuccessModal;
