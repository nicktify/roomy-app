import React, { useContext, useState } from 'react';
import { Dimensions, Image, Linking, Pressable, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Context } from '../context/MainContext';
import ShowSocialMediaPreviewLinkmodal from '../components/modals/ShowSocialMediaPreviewLinkModal';
import ShowUserOnFetchModal from '../components/modals/ShowUserOnFetchModal';
import { principalColor } from '../config/colors';
import { API } from '../config/environment/constants';
import { User } from '../types/user';

const windowWidth = Dimensions.get('window').width;

const AddUserToRoomScreen = () => {

  const {
    user,
    selectedRoom,
    getAllUsersFromRoom,
  } = useContext(Context);

  const [searchUserOnFetchInputValue, setSearchUserOnFetchInputValue] = useState('');
  const [searchedUserOnFetchresult, setSearchedUserOnFetchResult] = useState<User | null>(null);
  const [showNotFound, setShowNotFound] = useState(false);
  const [showProfilePreview, setShowProfilePreview] = useState<User | null>(null);
  const [showPreviewSocialMediaLink, setShowPreviewSocialMediaLink] = useState(false);
  const [selectedSocialMediaLink, setSelectedSocialMediaLink] = useState('');

  const fetchAllUsersFromRoom = () => {
    selectedRoom && getAllUsersFromRoom(selectedRoom.id)
      .catch(error => {
        console.log(error);
      });
  };

  const fetchSearchedUser = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    const email = searchUserOnFetchInputValue.toLocaleLowerCase();

    await axios.get(`${API}/users/get-by-email/${email}`, {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` }
    })
      .then(response => {
        if (response.data.msg !== 'User not exist.') {
          setSearchedUserOnFetchResult(response.data);
          setShowNotFound(false);
        }
        if (response.data.msg === 'User not exist.') {
          setShowNotFound(true);
          setSearchedUserOnFetchResult(null);
        }
      })
      .catch(error => {
        console.log(error);
        setSearchedUserOnFetchResult(null);
        setShowNotFound(true);
      });
  };

  const handleAddUserToRoom = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;
    if (!selectedRoom || !user || !searchedUserOnFetchresult) return;

    axios.post(`${API}/rooms/newparticipant`, {
      id: selectedRoom.id,
      owner: user.id,
      newParticipant: searchedUserOnFetchresult.id,
    }, {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` }
    })
      .then(() => {
        fetchAllUsersFromRoom();
        setSearchedUserOnFetchResult(null);
        setShowNotFound(false);
        setSearchUserOnFetchInputValue('');
        setSearchedUserOnFetchResult(null);
        setShowPreviewSocialMediaLink(false);
        setShowProfilePreview(null);
      })
      .catch(error => console.log(error));
  };

  const handleSocialMediaPress = (type: string) => {
    if (type === 'facebook') {
      Linking.canOpenURL(showProfilePreview?.socialMediaLinks.facebook!).then(supported => {
        if (supported) {
          Linking.openURL(showProfilePreview?.socialMediaLinks.facebook!);
        } else {
          setShowPreviewSocialMediaLink(true);
          setSelectedSocialMediaLink(showProfilePreview?.socialMediaLinks.facebook!);
        }
      });
    }
    if (type === 'twitter') {
      Linking.canOpenURL(showProfilePreview?.socialMediaLinks.twitter!).then(supported => {
        if (supported) {
          Linking.openURL(showProfilePreview?.socialMediaLinks.twitter!);
        } else {
          setShowPreviewSocialMediaLink(true);
          setSelectedSocialMediaLink(showProfilePreview?.socialMediaLinks.twitter!);
        }
      });
    }
    if (type === 'instagram') {
      Linking.canOpenURL(showProfilePreview?.socialMediaLinks.instagram!).then(supported => {
        if (supported) {
          Linking.openURL(showProfilePreview?.socialMediaLinks.instagram!);
        } else {
          setShowPreviewSocialMediaLink(true);
          setSelectedSocialMediaLink(showProfilePreview?.socialMediaLinks.instagram!);
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
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'white',
          elevation: 5,
          paddingVertical: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          width: '100%',
        }}
      >
        <TextInput
          style={{
            backgroundColor: 'white',
            borderColor: 'black',
            borderRadius: 20,
            borderWidth: 0.2,
            color: '#3a3a3a',
            fontSize: 18,
            paddingHorizontal: 10,
            width: windowWidth * 0.9,
          }}
          placeholder='Search new user by email'
          placeholderTextColor='#4a4a4a'
          onChangeText={(searchUserOnFetchInputValue) => setSearchUserOnFetchInputValue(searchUserOnFetchInputValue)}
          value={searchUserOnFetchInputValue}
          defaultValue={searchUserOnFetchInputValue}
          keyboardType='email-address'
        />
      </View>
      <Pressable
        style={{
          alignItems: 'center',
          backgroundColor: principalColor,
          borderRadius: 20,
          elevation: 5,
          height: 50,
          justifyContent: 'center',
          marginTop: 18,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          width: 110,
        }}
        onPress={() => fetchSearchedUser()}
      >
        <Text style={{ color: 'white', fontSize: 18, }}>Search</Text>
      </Pressable>
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
        searchedUserOnFetchresult && !searchedUserOnFetchresult.msg &&
        <View
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
        >
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              width: '60%',
            }}
          >
            {
              searchedUserOnFetchresult && searchedUserOnFetchresult.profilePicture ?
                <Image
                  source={{
                    uri: searchedUserOnFetchresult.profilePicture
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
            <Text style={{ fontSize: 18, fontWeight: 'bold', opacity: 0.8, marginLeft: 10 }}>{searchedUserOnFetchresult.name}</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '40%',
            }}
          >
            <Pressable
              style={{
                alignItems: 'center',
                backgroundColor: 'white',
                borderColor: '#a4a4a4a4',
                borderRadius: 20,
                borderWidth: 0.5,
                justifyContent: 'center',
                padding: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.20,
                shadowRadius: 1.41,
                elevation: 2,
                width: 60,
              }}
              onPress={() => setShowProfilePreview(searchedUserOnFetchresult)}
            >
              <Text style={{ color: 'black' }}>View</Text>
            </Pressable>
            <Pressable
              style={{
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 20,
                borderColor: '#a4a4a4a4',
                borderWidth: 0.5,
                elevation: 2,
                justifyContent: 'center',
                padding: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.20,
                shadowRadius: 1.41,
                width: 60,
              }}
              onPress={handleAddUserToRoom}
            >
              <Text style={{ color: 'black' }}>Add</Text>
            </Pressable>
          </View>
        </View>
      }

      {/* Modals */}
      <ShowUserOnFetchModal 
        showProfilePreview={showProfilePreview}
        setShowProfilePreview={setShowProfilePreview}
        handleSocialMediaPress={handleSocialMediaPress}
        handleAddUserToRoom={handleAddUserToRoom}
      />
      <ShowSocialMediaPreviewLinkmodal 
        showPreviewSocialMediaLink={showPreviewSocialMediaLink}
        setShowPreviewSocialMediaLink={setShowPreviewSocialMediaLink}
        selectedSocialMediaLink={selectedSocialMediaLink}
      />

    </View>
  );
};

export default AddUserToRoomScreen;