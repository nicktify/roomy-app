import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Dimensions, Image, Modal, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SocialMediaIcon from '../components/SocialMediaIcon';
import SocialMediaIcons from '../components/SocialMediaIcons';
import { principalColor } from '../config/colors';
import { Context } from '../context/MainContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { style as modalStyles } from '../styles/components/modal';

const ProfileScreen = () => {

  const { user, updateProfilePicture, changeProfileBackground, changeSocialMediaIcon, changeAbout } = useContext(Context);

  const [modalVisible, setModalVisible] = useState(false);
  const [pictureType, setPictureType] = useState('');
  const [selectedSocialMediaIcon, setSelectedSocialMediaIcon] = useState<string>('');
  const [showModalChangeSocialMedia, setShowModalSocialMedia] = useState(false);
  const [socialMediaLinkTextInputValue, setSocialMediaLinkTextInputValue] = useState<string | null>();
  const [link, setLink] = useState<string>('');
  const [showTextInputChangeAbout, setShowTextInputChangeAbout] = useState(false);
  const [about, setAbout] = useState('');
  const [saveAboutDisabled, setSaveAboutDisabled] = useState(false);

  useEffect(() => {
    if (user && user.about.length > 0) {
      setAbout(user.about);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.about.length > 0) {
      setAbout(user.about);
    }
  }, []);

  const handleChangeAbout = () => {
    if (about.length > 0) {
      setSaveAboutDisabled(true);
      changeAbout(about)
        .then(() => {
          setSaveAboutDisabled(false);
          setShowTextInputChangeAbout(false);
        })
        .catch(error => {
          console.log(error);
          setSaveAboutDisabled(false);
        });
    }
  };

  const handleChangeSocialLink = () => {
    if (link.length > 0) {
      changeSocialMediaIcon(selectedSocialMediaIcon, link)
        .then(result => {
          setShowModalSocialMedia(false);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const handleSocialMediaPress = (icon: string) => {
    setSelectedSocialMediaIcon(icon);
    setShowModalSocialMedia(true);

    if (icon === 'facebook') {
      setSocialMediaLinkTextInputValue(user?.socialMediaLinks.facebook);
      setLink(user?.socialMediaLinks.facebook ? user.socialMediaLinks.facebook : '');
    }

    if (icon === 'twitter') {
      setSocialMediaLinkTextInputValue(user?.socialMediaLinks.twitter);
      setLink(user?.socialMediaLinks.twitter ? user.socialMediaLinks.twitter : '');

    }

    if (icon === 'instagram') {
      setSocialMediaLinkTextInputValue(user?.socialMediaLinks.instagram);
      setLink(user?.socialMediaLinks.instagram ? user.socialMediaLinks.instagram : '');
    };
  };

  const handleUploadImage = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5
    }, (resp: ImagePickerResponse) => {

      if (resp.didCancel) return;
      if (!resp.uri) return;

      if (pictureType === 'profilePicture') {
        updateProfilePicture(resp)
          .then()
          .catch(error => {
            console.log(error);
          });
      }

      if (pictureType === 'backgroundPicture') {
        changeProfileBackground(resp)
          // .then()
          .catch(error => {
            console.log(error);
          });
      }

      setModalVisible(false);
      setPictureType('');

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
          // .then()
          .catch(error => console.log(error));
      }

      setModalVisible(false);
      setPictureType('');
    });
  };

  const handleModal = (type: string) => {
    setPictureType(type);
    setModalVisible(true);
  };

  return (
    <KeyboardAwareScrollView>



      <View style={{ flex: 1 }}>
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
                  onPress={() => handleModal('profilePicture')}
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
                <Pressable
                  style={{
                    alignSelf: 'center',
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                    backgroundColor: 'black'
                  }}
                  onPress={() => handleModal('profilePicture')}
                >
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
            <SocialMediaIcons handleSocialMediaPress={handleSocialMediaPress} />
          </View>
          <View
            style={{
              borderTopColor: 'black',
              borderTopWidth: 1,
              width: '90%',
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <Text style={{ width: '100%', textAlign: 'center', fontSize: 20, fontWeight: 'bold', opacity: 0.8, marginBottom: 10, }}>About</Text>
            {
              user && user.about.length > 0 && showTextInputChangeAbout === false ?
                <View>
                  <Pressable
                    onPress={() => setShowTextInputChangeAbout(true)}
                  >
                    <Text style={{ fontSize: 16 }}>{user.about}</Text>
                  </Pressable>
                  <Pressable
                    style={{
                      width: 120,
                      height: 50,
                      justifyContent: 'center',
                      marginTop: 30,
                      alignItems: 'center',
                      alignSelf: 'center',
                      backgroundColor: 'white',
                      borderRadius: 5,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,
                      elevation: 3,
                    }}
                    onPress={() => setShowTextInputChangeAbout(true)}
                  >
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Edit about</Text>
                  </Pressable>

                </View>
                :
                !showTextInputChangeAbout ?
                  <Pressable
                    style={{
                      width: 80,
                      marginTop: 30,
                      alignItems: 'center',
                      alignSelf: 'center',
                      backgroundColor: 'white',
                      borderRadius: 5,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,
                      elevation: 3,
                    }}
                    onPress={() => setShowTextInputChangeAbout(true)}
                  >
                    <Icon
                      name='add'
                      size={40}
                    />
                  </Pressable>
                  :
                  <View
                    style={{
                    }}
                  >
                    <TextInput
                      style={{
                        width: '100%',
                        color: 'black',
                        fontSize: 16,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: 'black'
                      }}
                      onChangeText={(about) => setAbout(about)}
                      value={about}
                      defaultValue=""
                      multiline
                    />
                    <View
                      style={{ flexDirection: 'row', justifyContent: 'center' }}
                    >

                      <Pressable
                        style={{
                          backgroundColor: principalColor,
                          borderRadius: 5,
                          width: 100,
                          height: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                          marginTop: 20,
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.22,
                          shadowRadius: 2.22,
                          elevation: 3,
                          marginHorizontal: 20,
                          marginBottom: 50,
                          opacity: saveAboutDisabled ? 0.5 : 1
                        }}
                        onPress={handleChangeAbout}
                      >
                        <Text style={{ color: 'white', fontSize: 20 }}>Save</Text>
                      </Pressable>
                      <Pressable
                        style={{
                          backgroundColor: 'white',
                          borderRadius: 5,
                          width: 100,
                          height: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                          marginTop: 20,
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.22,
                          shadowRadius: 2.22,
                          elevation: 3,
                          marginHorizontal: 20,
                          marginBottom: 50,
                        }}
                        onPress={() => setShowTextInputChangeAbout(false)}
                      >
                        <Text style={{ color: 'black', fontSize: 20 }}>Cancel</Text>
                      </Pressable>
                    </View>
                  </View>
            }
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
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={modalStyles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>

        </Modal>

        {/* Change social media modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModalChangeSocialMedia}
          onRequestClose={() => {
            setModalVisible(!showModalChangeSocialMedia);
          }}
        >
          <View
            style={{ flex: 1, backgroundColor: 'black', opacity: 0.5, position: 'absolute', width: windowWidth, height: windowHeight }}
          >
          </View>
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <SocialMediaIcon name={selectedSocialMediaIcon} />
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
                defaultValue={socialMediaLinkTextInputValue ? socialMediaLinkTextInputValue : ''}
              />
              <Pressable
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
                  opacity: link.length > 0 ? 1 : 0.5
                }}
                onPress={handleChangeSocialLink}
              >
                <Text style={modalStyles.textStyle}>OK</Text>
              </Pressable>
              <Pressable
                style={modalStyles.button}
                onPress={() => setShowModalSocialMedia(!showModalChangeSocialMedia)}
              >
                <Text style={modalStyles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>

        </Modal>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ProfileScreen;