import React, { useContext, useState } from 'react';
import { Dimensions, Image, Linking, Pressable, Text, TextInput, View, TouchableOpacity, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Context } from '../context/MainContext';
import ShowSocialMediaPreviewLinkModal from '../components/modals/ShowSocialMediaPreviewLinkModal';
import ShowUserOnFetchModal from '../components/modals/ShowUserOnFetchModal';
import { principalColor } from '../config/colors';
import { User } from '../types/user';
import styles from '../styles/screens/addUserToRoom';
import UserAddedToRoomModal from '../components/modals/UserAddedToRoomModal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddUserToRoomScreen = () => {

  const { user, selectedRoom, getAllUsersFromRoom, makeUserParticipantOfRoom, fetchUserByEmail, searchedUser, cleanSearchedUser } = useContext(Context);

  const [searchUserOnFetchInputValue, setSearchUserOnFetchInputValue] = useState('');
  const [showNotFound, setShowNotFound] = useState(false);
  const [showProfilePreview, setShowProfilePreview] = useState<User | null>(null);
  const [showPreviewSocialMediaLink, setShowPreviewSocialMediaLink] = useState(false);
  const [selectedSocialMediaLink, setSelectedSocialMediaLink] = useState<string | undefined>(undefined);
  const [showUserAddedToRoomModal, setShowUserAddedToRoomModal] = useState<boolean>(false);

  const fetchSearchedUser = async () => {
    if (searchUserOnFetchInputValue.length === 0) return;
    const email = searchUserOnFetchInputValue.toLocaleLowerCase();

    fetchUserByEmail(email)
      .then(() => {
        setShowNotFound(false);
      })
      .catch(() => {
        setShowNotFound(true);
        cleanSearchedUser()
      })
  };

  const handleAddUserToRoom = async () => {
    if (!selectedRoom || !user || !searchedUser) return;

    makeUserParticipantOfRoom(searchedUser.id)
    .then(() => {
      setShowUserAddedToRoomModal(true);
    })
    .then(() => {
      getAllUsersFromRoom(selectedRoom.id);
    })
    .catch(error => {
      console.log(error)
    })
  };

  const handleSocialMediaPress = (type: string) => {
    if (type === 'facebook' && showProfilePreview) {
      Linking.canOpenURL(showProfilePreview.socialMediaLinks.facebook).then(supported => {
        if (supported) {
          Linking.openURL(showProfilePreview.socialMediaLinks.facebook);
        } else {
          setShowPreviewSocialMediaLink(true);
          setSelectedSocialMediaLink(showProfilePreview.socialMediaLinks.facebook);
        }
      });
    }
    if (type === 'twitter' && showProfilePreview) {
      Linking.canOpenURL(showProfilePreview.socialMediaLinks.twitter).then(supported => {
        if (supported) {
          Linking.openURL(showProfilePreview.socialMediaLinks.twitter);
        } else {
          setShowPreviewSocialMediaLink(true);
          setSelectedSocialMediaLink(showProfilePreview?.socialMediaLinks.twitter!);
        }
      });
    }
    if (type === 'instagram' && showProfilePreview) {
      Linking.canOpenURL(showProfilePreview.socialMediaLinks.instagram).then(supported => {
        if (supported) {
          Linking.openURL(showProfilePreview.socialMediaLinks.instagram);
        } else {
          setShowPreviewSocialMediaLink(true);
          setSelectedSocialMediaLink(showProfilePreview.socialMediaLinks.instagram);
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text  style={styles.title}>
        {`Add new user to \n${selectedRoom?.name}`}
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder='Search new user by email'
        placeholderTextColor='#4a4a4a'
        keyboardType='email-address'
        autoFocus
        onChangeText={(searchUserOnFetchInputValue) => setSearchUserOnFetchInputValue(searchUserOnFetchInputValue)}
        value={searchUserOnFetchInputValue}
        defaultValue={searchUserOnFetchInputValue}
        onEndEditing={() => fetchSearchedUser()}
      />
      <TouchableOpacity style={styles.searchButton} onPress={() => fetchSearchedUser()}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
      {
        showNotFound &&
        <View
          style={styles.showNotFoundContainer}
        >
          <Text style={styles.showNotFoundTextOne}>User Not Found, please try again.</Text>
          <Text style={styles.showNotFoundTextTwo}>Did you type a correct email?</Text>
        </View>
      }
      {
        searchedUser &&
        <View>
          <TouchableOpacity style={styles.userContainer} onPress={() => setShowProfilePreview(searchedUser)}>
            <View style={styles.userInnercontainer}>
              {
                searchedUser && searchedUser.profilePicture ?
                  <Image
                    source={{ uri: searchedUser.profilePicture }}
                    width={50}
                    height={50}
                    style={styles.userProfilePicture}
                  />
                  :
                  <Icon
                    name='account-circle'
                    color={principalColor}
                    size={50}
                  />
              }
              <Text style={styles.userName}>{searchedUser.name}</Text>
            </View>
          </TouchableOpacity>
        {
          searchedUser  && selectedRoom && 
          (selectedRoom.owners.includes(searchedUser.id) || selectedRoom?.participants.includes(searchedUser.id)) &&
            <Text style={styles.userIsParticipantErrorText}>This user is already a participant of this room</Text>
        }
        <View style={styles.userActionButtonsContainer}>
            <TouchableOpacity style={styles.viewUserButton} onPress={() => setShowProfilePreview(searchedUser)}>
              <Text style={styles.viewUserButtonText}>View</Text>
            </TouchableOpacity>
            {
              searchedUser  && selectedRoom && 
              (selectedRoom.owners.includes(searchedUser.id) || selectedRoom?.participants.includes(searchedUser.id)) ?
                <Pressable style={[styles.addUserButton, { opacity: 0.5 }]}>
                  <Text style={styles.addUserButtonText}>Add</Text>
                </Pressable>
                :
                <TouchableOpacity style={styles.addUserButton} onPress={handleAddUserToRoom}>
                  <Text style={styles.addUserButtonText}>Add</Text>
                </TouchableOpacity>
            }
          </View>
        </View>
      }

      <ShowUserOnFetchModal
        showProfilePreview={showProfilePreview}
        setShowProfilePreview={setShowProfilePreview}
        handleSocialMediaPress={handleSocialMediaPress}
        handleAddUserToRoom={handleAddUserToRoom}
      />
      <ShowSocialMediaPreviewLinkModal
        showPreviewSocialMediaLink={showPreviewSocialMediaLink}
        setShowPreviewSocialMediaLink={setShowPreviewSocialMediaLink}
        selectedSocialMediaLink={selectedSocialMediaLink}
      />
      <UserAddedToRoomModal 
        showUserAddedToRoomModal={showUserAddedToRoomModal}
        setShowUserAddedToRoomModal={setShowUserAddedToRoomModal}
        setShowProfilePreview={setShowProfilePreview}
        cleanSearchedUser={cleanSearchedUser}
        searchedUser={searchedUser}
      />
      
    </View>
  );
};

export default AddUserToRoomScreen;