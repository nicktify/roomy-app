import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Dimensions, Image, Modal, Pressable, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChangeSocialMediaModal from '../components/modals/ChangeSocialMediaModal';
import SelectProfilePictureModal from '../components/modals/SelectProfilePictureModal';
import SocialMediaIcons from '../components/SocialMediaIcons';
import { principalColor } from '../config/colors';
import { Context } from '../context/MainContext';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProfileScreen = ({navigation}: any) => {

  const { user, updateProfilePicture, changeProfileBackground, changeSocialMediaIcon } = useContext(Context);

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

  const handleChangeSocialLink = () => {
    if (link.length > 0) {
      changeSocialMediaIcon(selectedSocialMediaIcon, link)
        .then(() => {
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
          .catch(error => {
            console.log(error);
          });
      }

      if (pictureType === 'backgroundPicture') {
        changeProfileBackground(resp)
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
                  <TouchableOpacity
                    style={{
                      width: 120,
                      height: 50,
                      justifyContent: 'center',
                      marginTop: 30,
                      alignItems: 'center',
                      alignSelf: 'center',
                      backgroundColor: principalColor,
                      borderRadius: 20,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,
                      elevation: 3,
                    }}
                    onPress={() => navigation.navigate('EditAboutForm')}
                  >
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Edit about</Text>
                  </TouchableOpacity>
                </View>
                :
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
                    onPress={() => navigation.navigate('EditAboutForm')}
                  >
                    <Icon
                      name='add'
                      size={40}
                    />
                  </Pressable>
            }
          </View>
        </View>

        <SelectProfilePictureModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          handleUploadImage={handleUploadImage}
          handleTakePicture={handleTakePicture}
        />
        <ChangeSocialMediaModal 
          showModalChangeSocialMedia={showModalChangeSocialMedia}
          setModalVisible={setModalVisible}
          selectedSocialMediaIcon={selectedSocialMediaIcon}
          link={link}
          setLink={setLink}
          socialMediaLinkTextInputValue={socialMediaLinkTextInputValue}
          handleChangeSocialLink={handleChangeSocialLink}
          setShowModalSocialMedia={setShowModalSocialMedia}
        />

      </View>
    </KeyboardAwareScrollView>
  );
};

export default ProfileScreen;