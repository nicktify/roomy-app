import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Dimensions, Image, Modal, Pressable } from 'react-native';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SocialMediaIcons from '../components/SocialMediaIcons';
import { principalColor } from '../config/colors';
import { Context } from '../context/MainContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { style as modalStyles } from '../styles/components/modal';

const ProfileScreen = () => {

  const { user, updateProfilePicture, changeProfileBackground } = useContext( Context );
  
  
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ pictureType, setPictureType ] = useState('')
  
  useEffect(() => {}, [user]);

  const handleSocialMediaPress = (icon: string) => {
    console.log(icon)
  }

  const handleUploadImage = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5
    }, (resp: ImagePickerResponse) => {

      if (resp.didCancel) return;
      if (!resp.uri) return;

      if (pictureType === 'profilePicture') {
        updateProfilePicture(resp);
      }

      if (pictureType === 'backgroundPicture') {
        changeProfileBackground(resp)
        .then(result => {
          console.log(result)
        })
        .catch(error => {
          console.log(error)
        })
      }

      setModalVisible(false);
      setPictureType('')
    });
  };

  const handleTakePicture = () => {
    launchCamera({
      mediaType: 'photo',
      quality: 0.5
    }, (resp: ImagePickerResponse) => {

      if (resp.didCancel) return;
      if (!resp.uri) return;

      if (pictureType === 'profilePicture') {
        updateProfilePicture(resp);
      }

      if (pictureType === 'backgroundPicture') {
        changeProfileBackground(resp)
        .then(result => {
          console.log(result)
        })
      }

      setModalVisible(false);
      setPictureType('')
    });
  }

  const handleModal = (type: string) => {
    setPictureType(type)
    setModalVisible(true)
  }

  return (
    <View style={{flex: 1}}>
      <View style={{
        width: windowWidth,
        height: 250
      }}>
        <Pressable
          onPress={() => handleModal('backgroundPicture')}
        >
          {
            user?.profileBackground ? 
            <Image 
              style={{
                width: '100%',
                height: '100%'
              }}
              source={{
                uri: user.profileBackground
              }}
              width={windowWidth}
              height={windowHeight * 0.30}
            />
            : 
            <View
              style={{
                backgroundColor: '#a1a1a1a1',
                width: windowWidth,
                height: windowHeight * 0.30,
              }}
            >
            </View>
          }
          </Pressable>


        <View
          style={{
            width: windowWidth,
            bottom: 50,
          }}
        >
        {
          user?.profilePicture ?
            <Pressable
              style={{
                alignSelf: 'center',
                height: 100,
                width: 100,
                borderRadius: 50,
              }}
              onPress={() => handleModal('backgroundPicture')}
            >
              <Image
                source={{
                  uri: user.profilePicture,
                }}
                style={{
                  alignSelf: 'center',
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                }}
              />
            </Pressable>
            :
            <Pressable>
              <Icon
                style={{
                  alignSelf: 'center',
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                }}
                name="account-circle"
                size={80}
                color={principalColor}
                onPress={() => setModalVisible(true)}
              />
            </Pressable>
        }
        </View>
      </View>
      <View
        style={{
          width: windowWidth,
          marginTop: 40,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: 'bold', opacity: 0.8 }}>{user?.name}</Text>
        <View>
          <SocialMediaIcons handleSocialMediaPress={handleSocialMediaPress}/>
        </View>
        <View
          style={{
            borderTopColor: 'black',
            borderTopWidth: 1,
            width: '90%',
            paddingTop: 10,
          }}
        >
          <Text>hola como estas mi nombre es nicolas y soy un full stack developer</Text>
        </View>
      </View>


      {/* Select profile picture modal */}
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
  );
};

export default ProfileScreen;