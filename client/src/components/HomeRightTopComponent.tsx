import React, { useContext, useEffect, useState } from 'react';
import { Image, Modal, Pressable, Text, TouchableWithoutFeedback, View, Dimensions } from 'react-native';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { principalColor } from '../config/colors';
import { Context } from '../context/MainContext';

import styles from '../styles/components/homeRightTop';

import { style as modalStyles } from '../styles/components/modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeRightTopComponent = () => {
  const [ modalVisible, setModalVisible ] = useState(false);

  const { user, updateProfilePicture } = useContext( Context );

  useEffect(() => {}, [user]);

  const handleUploadImage = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5
    }, (resp: ImagePickerResponse) => {

      if (resp.didCancel) return;
      if (!resp.uri) return;

      updateProfilePicture(resp);
      setModalVisible(false);
    });
  };

  const handleTakePicture = () => {
    launchCamera({
      mediaType: 'photo',
      quality: 0.5
    }, (resp: ImagePickerResponse) => {

      if (resp.didCancel) return;
      if (!resp.uri) return;

      updateProfilePicture(resp);
      setModalVisible(false);
    });
  }

  return (
    <>
      <View style={styles.rightTopContainer}>
        <Image
          style={{ resizeMode: 'contain', position: 'absolute', alignSelf: 'flex-end', top: -10, right: 20 }}
          source={require('../assets/roomy.png')}
          width={50}
          height={50}
        />
        {
          user?.profilePicture ?
            <TouchableWithoutFeedback
              style={{ flex: 1 }}
              onPress={() => setModalVisible(true)}
            >
              <Image
                source={{
                  uri: user.profilePicture,
                }}
                style={styles.profileImage}
              />
            </TouchableWithoutFeedback>
            :
            <Icon
              style={styles.profileImage}
              name="account-circle"
              size={80}
              color={principalColor}
              onPress={() => setModalVisible(true)}
            />
        }
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{ flex: 1, backgroundColor: 'black', opacity: 0.5 , position: 'absolute', width: windowWidth, height: windowHeight }}
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
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={modalStyles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>

        </Modal>
      </View>
    </>
  );
};

export default HomeRightTopComponent;