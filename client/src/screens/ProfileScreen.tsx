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
import styles from '../styles/screens/profileScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProfileScreen = ({navigation}: any) => {

  const { user, updateProfilePicture, changeProfileBackground, changeSocialMediaIcon } = useContext(Context);

  const [modalVisible, setModalVisible] = useState(false);
  const [pictureType, setPictureType] = useState('');
  const [selectedSocialMediaIcon, setSelectedSocialMediaIcon] = useState<string>('');
  const [showModalChangeSocialMedia, setShowModalChangeSocialMedia] = useState(false);
  const [link, setLink] = useState<string>('');
  const [showTextInputChangeAbout, setShowTextInputChangeAbout] = useState(false);

  const handleChangeSocialLink = () => {
    changeSocialMediaIcon(selectedSocialMediaIcon, link)
      .then(() => {
        setShowModalChangeSocialMedia(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSocialMediaPress = (icon: string) => {
    setSelectedSocialMediaIcon(icon);
    setShowModalChangeSocialMedia(true);

    if (icon === 'facebook' && user && user.socialMediaLinks) {
      setLink(user.socialMediaLinks.facebook);
    }

    if (icon === 'twitter' && user && user.socialMediaLinks) {
      setLink(user.socialMediaLinks.twitter);
    }

    if (icon === 'instagram' && user && user.socialMediaLinks) {
      setLink(user.socialMediaLinks.instagram);
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
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={() => handleModal('backgroundPicture')}>
            {
              user?.profileBackground ?
                <Image
                  style={styles.profileBackgroundImage}
                  source={{ uri: user.profileBackground }}
                  width={windowWidth}
                  height={windowHeight * 0.30}
                />
                :
                <View style={styles.phantomContainer}></View>
            }
          </TouchableOpacity>
          <View style={styles.profilePictureContainer}>
            {
              user?.profilePicture ?
                <TouchableOpacity
                  style={styles.touchableProfilePicture}
                  onPress={() => handleModal('profilePicture')}
                >
                  <Image source={{ uri: user.profilePicture, }} style={styles.profilePictureImage}/>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.phantomTouchableProfilePicture} onPress={() => handleModal('profilePicture')}></TouchableOpacity>
            }
          </View>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{user?.name}</Text>
          <View>
            <SocialMediaIcons handleSocialMediaPress={handleSocialMediaPress} />
          </View>
          <View style={styles.aboutContainer}>
            <Text style={styles.aboutTextTitle}>About</Text>
            {
              user && user.about.length > 0 && showTextInputChangeAbout === false ?
                <View>
                  <TouchableOpacity
                    onPress={() => setShowTextInputChangeAbout(true)}
                  >
                    <Text style={{ fontSize: 16 }}>{user.about}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.editAboutButton}
                    onPress={() => navigation.navigate('EditAboutForm')}
                  >
                    <Text style={styles.editAboutText}>Edit about</Text>
                  </TouchableOpacity>
                </View>
                :
                  <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('EditAboutForm')}>
                    <Icon name='add' size={40} />
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
          setShowModalChangeSocialMedia={setShowModalChangeSocialMedia}
          selectedSocialMediaIcon={selectedSocialMediaIcon}
          link={link}
          setLink={setLink}
          handleChangeSocialLink={handleChangeSocialLink}
        />

      </View>
    </KeyboardAwareScrollView>
  );
};

export default ProfileScreen;