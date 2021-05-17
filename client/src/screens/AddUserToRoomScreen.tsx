import React, { useContext, useState } from 'react';
import { Dimensions, Image, Linking, Pressable, Text, TextInput, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Context } from '../context/MainContext';
import ShowSocialMediaPreviewLinkModal from '../components/modals/ShowSocialMediaPreviewLinkModal';
import ShowUserOnFetchModal from '../components/modals/ShowUserOnFetchModal';
import { principalColor } from '../config/colors';
import { API } from '../config/environment/constants';
import { User } from '../types/user';

const windowWidth = Dimensions.get('window').width;

const AddUserToRoomScreen = ({navigation}: any) => {

  const {
    user,
    selectedRoom,
    getAllUsersFromRoom,
    makeUserParticipantOfRoom,
  } = useContext(Context);

  const [searchUserOnFetchInputValue, setSearchUserOnFetchInputValue] = useState('');
  const [searchedUserOnFetchresult, setSearchedUserOnFetchResult] = useState<User | null>(null);
  const [showNotFound, setShowNotFound] = useState(false);
  const [showProfilePreview, setShowProfilePreview] = useState<User | null>(null);
  const [showPreviewSocialMediaLink, setShowPreviewSocialMediaLink] = useState(false);
  const [selectedSocialMediaLink, setSelectedSocialMediaLink] = useState('');

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

    /** In this if statment we ask if the fetched on search user is already a participant of the current room
     * and if so, return without doing anything.
     */
    if (searchedUserOnFetchresult && !searchedUserOnFetchresult.msg && selectedRoom && 
      (selectedRoom.owners.includes(searchedUserOnFetchresult.id) || selectedRoom?.participants.includes(searchedUserOnFetchresult.id))) return;
    
    const token = await AsyncStorage.getItem('token');
    if (!token) return;
    if (!selectedRoom || !user || !searchedUserOnFetchresult) return;

    makeUserParticipantOfRoom(searchedUserOnFetchresult.id)
    .then(() => {
      navigation.goBack();
    })
    .then(() => {
      getAllUsersFromRoom(selectedRoom.id);
    })
    .catch(error => {
      console.log(error)
    })
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
      <Text style={{
        color: '#69C1AC',
        fontSize: 30,
        alignSelf: 'center',
        fontWeight: 'bold',
      }}>
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
        searchedUserOnFetchresult && !searchedUserOnFetchresult.msg &&
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
          onPress={() => setShowProfilePreview(searchedUserOnFetchresult)}
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
        </TouchableOpacity>
        {
          searchedUserOnFetchresult && !searchedUserOnFetchresult.msg && selectedRoom && 
          (selectedRoom.owners.includes(searchedUserOnFetchresult.id) || selectedRoom?.participants.includes(searchedUserOnFetchresult.id)) &&
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
              onPress={() => setShowProfilePreview(searchedUserOnFetchresult)}
            >
              <Text style={{ color: 'white' }}>View</Text>
            </TouchableOpacity>
            {
              searchedUserOnFetchresult && !searchedUserOnFetchresult.msg && selectedRoom && 
              (selectedRoom.owners.includes(searchedUserOnFetchresult.id) || selectedRoom.participants.includes(searchedUserOnFetchresult.id)) ?
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

    </View>
  );
};

export default AddUserToRoomScreen;