import React, { useContext, useState } from 'react';
import { Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
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
      user && user.socialMediaLinks && setSocialMediaLinkTextInputValue(user.socialMediaLinks.facebook);
      user && user.socialMediaLinks && setLink(user.socialMediaLinks.facebook ? user.socialMediaLinks.facebook : '');
    }

    if (icon === 'twitter') {
      user && user.socialMediaLinks && setSocialMediaLinkTextInputValue(user.socialMediaLinks.twitter);
      user && user.socialMediaLinks && setLink(user.socialMediaLinks.twitter ? user.socialMediaLinks.twitter : '');
    }

    if (icon === 'instagram') {
      user && user.socialMediaLinks && setSocialMediaLinkTextInputValue(user.socialMediaLinks.instagram);
      user && user.socialMediaLinks && setLink(user.socialMediaLinks.instagram ? user.socialMediaLinks.instagram : '');
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
          <TouchableOpacity
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
          </TouchableOpacity>
          <View
            style={{
              width: windowWidth,
              bottom: 50,
            }}
          >
            {
              user?.profilePicture ?
                <TouchableOpacity
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
                </TouchableOpacity>
                :
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                    backgroundColor: 'black'
                  }}
                  onPress={() => handleModal('profilePicture')}
                >
                </TouchableOpacity>
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
                  <TouchableOpacity
                    onPress={() => setShowTextInputChangeAbout(true)}
                  >
                    <Text style={{ fontSize: 16 }}>{user.about}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      backgroundColor: principalColor,
                      borderRadius: 10,
                      padding: 5,
                      justifyContent: 'center',
                      marginTop: 18,
                      width: windowWidth * 0.5,
                      alignSelf: 'center',
                    }}
                    onPress={() => navigation.navigate('EditAboutForm')}
                  >
                    <Text style={{ fontSize: 25,fontWeight: 'bold', color: 'white' }}>Edit about</Text>
                  </TouchableOpacity>
                </View>
                :
                  <TouchableOpacity
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
                  </TouchableOpacity>
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