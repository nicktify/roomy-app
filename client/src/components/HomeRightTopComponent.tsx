import React, { useContext, useEffect, useState } from 'react';
import { Image, Modal, Pressable, Text, TouchableWithoutFeedback, View } from 'react-native';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { principalColor } from '../config/colors';
import { Context } from '../context/MainContext';
import styles from '../styles/components/homeRightTop';

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
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={styles.button}
                onPress={handleUploadImage}
              >
                <Text style={styles.textStyle}>Select from galery</Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={handleTakePicture}
              >
                <Text style={styles.textStyle}>Take picture</Text>
              </Pressable>
              <Pressable
                style={styles.buttonCancel}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default HomeRightTopComponent;