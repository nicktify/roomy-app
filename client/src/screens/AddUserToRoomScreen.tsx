import React, { useContext, useState } from 'react';
import { Dimensions, Image, Linking, Pressable, Text, TextInput, View, TouchableOpacity, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Context } from '../context/MainContext';
import ShowSocialMediaPreviewLinkModal from '../components/modals/ShowSocialMediaPreviewLinkModal';
import ShowUserOnFetchModal from '../components/modals/ShowUserOnFetchModal';
import { principalColor } from '../config/colors';
import { User } from '../types/user';

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
      .catch(error => {
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
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        height: '100%',
        position: 'absolute',
        width: '100%',
      }}
    >
      <Text 
        style={{
          color: '#69C1AC',
          fontSize: 30,
          alignSelf: 'center',
          fontWeight: 'bold',
        }}
      >
        {`Add new user to \n${selectedRoom?.name}`}
      </Text>
      <TextInput
        style={{
          maxWidth: windowWidth * 0.9,
          fontSize: 18,
          width: windowWidth * 0.9,
          color: 'black',
          backgroundColor: '#E8E8E8',
          padding: 15,
          borderRadius: 10,
          alignSelf: 'center',
          marginVertical: 20,
        }}
        placeholder='Search new user by email'
        placeholderTextColor='#4a4a4a'
        keyboardType='email-address'
        autoFocus
        onChangeText={(searchUserOnFetchInputValue) => setSearchUserOnFetchInputValue(searchUserOnFetchInputValue)}
        value={searchUserOnFetchInputValue}
        defaultValue={searchUserOnFetchInputValue}
        onEndEditing={() => fetchSearchedUser()}
      />
      <TouchableOpacity
        style={{
          alignItems: 'center',
          backgroundColor: principalColor,
          borderRadius: 20,
          padding: 10,
          justifyContent: 'center',
          width: windowWidth * 0.5,
          alignSelf: 'center',
        }}
        onPress={() => fetchSearchedUser()}
      >
        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Search</Text>
      </TouchableOpacity>
      {
        showNotFound &&
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 30, opacity: 0.8, marginTop: 20 }}>User Not Found, please try again.</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 15, opacity: 0.8, marginTop: 20 }}>Did you type a correct email?</Text>
        </View>
      }
      {
        searchedUser &&
        <View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 5,
            elevation: 5,
            flexDirection: 'row',
            minHeight: 100,
            marginTop: 20,
            paddingHorizontal: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            width: windowWidth * 0.9,
          }}
          onPress={() => setShowProfilePreview(searchedUser)}
        >
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              width: '60%',
            }}
          >
            {
              searchedUser && searchedUser.profilePicture ?
                <Image
                  source={{
                    uri: searchedUser.profilePicture
                  }}
                  width={50}
                  height={50}
                  style={{
                    borderRadius: 50,
                    height: 50,
                    width: 50,
                  }}
                />
                :
                <Icon
                  name='account-circle'
                  color={principalColor}
                  size={50}
                />
            }
            <Text style={{ fontSize: 18, fontWeight: 'bold', opacity: 0.8, marginLeft: 10 }}>{searchedUser.name}</Text>
          </View>
        </TouchableOpacity>
        {
          searchedUser  && selectedRoom && 
          (selectedRoom.owners.includes(searchedUser.id) || selectedRoom?.participants.includes(searchedUser.id)) &&
          <Text style={{color: 'red', fontStyle: 'italic', fontSize: 12, marginTop: 10, }}>This user is already a participant of this room</Text>
        }
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}
        >
            <TouchableOpacity
              style={{
                backgroundColor: principalColor,
                borderRadius: 10,
                width: windowWidth * 0.4,
                paddingVertical: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setShowProfilePreview(searchedUser)}
            >
              <Text style={{ color: 'white' }}>View</Text>
            </TouchableOpacity>
            {
              searchedUser  && selectedRoom && 
              (selectedRoom.owners.includes(searchedUser.id) || selectedRoom?.participants.includes(searchedUser.id)) ?
                <Pressable
                  style={{
                    backgroundColor: principalColor,
                    borderRadius: 10,
                    width: windowWidth * 0.4,
                    paddingVertical: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.5,
                  }}
                >
                  <Text style={{ color: 'white' }}>Add</Text>
                </Pressable>
                :
                <TouchableOpacity
                  style={{
                    backgroundColor: principalColor,
                    borderRadius: 10,
                    width: windowWidth * 0.4,
                    paddingVertical: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={handleAddUserToRoom}
                >
                  <Text style={{ color: 'white' }}>Add</Text>
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

      <Modal
        animationType='slide'
        transparent={true}
        visible={showUserAddedToRoomModal}
        onRequestClose={() => {
          setShowUserAddedToRoomModal(!showUserAddedToRoomModal)
          setShowProfilePreview(null)
          cleanSearchedUser();
        }}
      >
      <View
        style={{ flex: 1, backgroundColor: 'black', opacity: 0.5, position: 'absolute', width: windowWidth, height: windowHeight }}
      >
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            alignSelf: 'center',
            padding: 20,
          }}
        >
          <Text>{`User ${searchedUser && searchedUser.name} added to room successfuly.`}</Text>
          <TouchableOpacity
            style={{
              paddingHorizontal: 25,
              paddingVertical: 10,
              backgroundColor: principalColor,
              alignSelf: 'center',
              borderRadius: 20,
              marginTop: 10,
            }}
            onPress={() => {
              setShowUserAddedToRoomModal(false)
              setShowProfilePreview(null)
              cleanSearchedUser();
            }}
          >
            <Text style={{color: 'white'}}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
      </Modal>

    </View>
  );
};

export default AddUserToRoomScreen;