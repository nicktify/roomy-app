import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Dimensions, Image, Linking, Modal, Pressable, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SocialMediaIcon from '../components/SocialMediaIcon';
import { principalColor } from '../config/colors';
import { API } from '../config/environment/constants';
import { Context } from '../context/MainContext';
import { User } from '../types/user';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddUserToRoomScreen = () => {

  const { 
    user,
    selectedRoom,
    getAllUsersFromRoom,
    handleDeleteUserFromRoom,
    makeUserOwnerOfRoom,
    makeUserParticipantOfRoom,
    selectedRoomUsers,
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
          setSearchedUserOnFetchResult(null)
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
        backgroundColor: '#f1f1f1',
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          alignItems: 'center',
          paddingVertical: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <TextInput
          style={{
            backgroundColor: 'white',
            borderColor: 'black',
            borderRadius: 20,
            borderWidth: 0.2,
            paddingHorizontal: 10,
            width: windowWidth * 0.9,
            color: '#3a3a3a',
            fontSize: 18,
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
          backgroundColor: principalColor,
          width: 110,
          height: 50,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 18,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
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
            backgroundColor: 'white',
            width: windowWidth * 0.9,
            minHeight: 100,
            borderRadius: 5,
            marginTop: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
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
                    width: 50,
                    height: 50,
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
              flexDirection: 'row',
              alignItems: 'center',
              width: '40%',
              justifyContent: 'space-between'
            }}
          >
            <Pressable
              style={{
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 5,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.20,
                shadowRadius: 1.41,
                elevation: 2,
                borderWidth: 0.5,
                borderColor: '#a4a4a4a4',
              }}
              onPress={() => setShowProfilePreview(searchedUserOnFetchresult)}
            >
              <Text style={{ color: 'black' }}>View</Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 5,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.20,
                shadowRadius: 1.41,
                elevation: 2,
                borderWidth: 0.5,
                borderColor: '#a4a4a4a4'
              }}
              onPress={handleAddUserToRoom}
            >
              <Text style={{ color: 'black' }}>Add</Text>
            </Pressable>

          </View>

        </View>
      }


      {/* Show user on fetch search preview modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showProfilePreview !== null}
        onRequestClose={() => {
          setShowProfilePreview(null);
        }}
      >
        <View
          style={{ flex: 1, backgroundColor: 'black', opacity: 0.5, position: 'absolute', width: windowWidth, height: windowHeight }}
        >
        </View>
        <View style={{
          flex: 1,
          width: windowWidth,
          height: windowHeight,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View
            style={{
              backgroundColor: 'white',
              width: windowWidth * 0.9,
              height: windowHeight * 0.8,
            }}
          >
            <View
              style={{
                backgroundColor: '#a8a8a8a8',
                height: 150,
              }}
            >
              {
                showProfilePreview && showProfilePreview.profileBackground && showProfilePreview.profileBackground.length > 0 &&
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={{
                    uri: showProfilePreview.profileBackground
                  }}
                  width={windowWidth * 0.9}
                  height={150}
                />
              }
              {
                showProfilePreview && showProfilePreview.profilePicture && showProfilePreview.profilePicture.length > 0 ?
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 50,
                      position: 'absolute',
                      bottom: -50,
                      alignSelf: 'center',
                    }}
                    source={{
                      uri: showProfilePreview && showProfilePreview.profilePicture ? showProfilePreview.profilePicture : undefined
                    }}
                    width={80}
                    height={80}
                  />
                  :
                  <Pressable
                    style={{
                      width: 80,
                      backgroundColor: 'black',
                      height: 80,
                      borderRadius: 50,
                      position: 'absolute',
                      bottom: -50,
                      alignSelf: 'center',
                    }}
                  >

                  </Pressable>

              }

            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                marginTop: 60
              }}
            >
              {
                showProfilePreview && showProfilePreview.socialMediaLinks && showProfilePreview.socialMediaLinks.facebook &&
                <Pressable
                  style={{
                    marginHorizontal: 15
                  }}
                  onPress={() => handleSocialMediaPress('facebook')}
                >
                  <SocialMediaIcon name='facebook' size={30} />
                </Pressable>
              }
              {
                showProfilePreview && showProfilePreview.socialMediaLinks && showProfilePreview.socialMediaLinks.twitter &&
                <Pressable
                  style={{
                    marginHorizontal: 15
                  }}
                  onPress={() => handleSocialMediaPress('twitter')}
                >
                  <SocialMediaIcon name='twitter' size={30} />
                </Pressable>
              }
              {
                showProfilePreview && showProfilePreview.socialMediaLinks && showProfilePreview.socialMediaLinks.instagram &&
                <Pressable
                  style={{
                    marginHorizontal: 15
                  }}
                  onPress={() => handleSocialMediaPress('instagram')}
                >
                  <SocialMediaIcon name='instagram' size={30} />
                </Pressable>
              }
            </View>
            <View
              style={{
                paddingHorizontal: 20,
              }}
            >
              <Text style={{color: 'black'}}>{showProfilePreview?.about}</Text>
            </View>
            
            <Pressable
              style={{
                backgroundColor: principalColor,
                width: 100,
                borderRadius: 40,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                position: 'absolute',
                bottom: 0,
                marginBottom: 20,
              }}
              onPress={handleAddUserToRoom}
            >
              <Text style={{color: 'white', fontSize: 20}}>Add</Text>
            </Pressable>

          </View>
        </View>
      </Modal>

      {/* show social media preview link modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPreviewSocialMediaLink}
        onRequestClose={() => {
          setShowPreviewSocialMediaLink(false);
        }}
      >
        <View
          style={{ flex: 1, backgroundColor: 'black', opacity: 0.5, position: 'absolute', width: windowWidth, height: windowHeight }}
        >
        </View>
        <View
          style={{width: windowWidth, height: windowHeight, justifyContent: 'center', alignItems: 'center'}}
        >
          <View
            style={{
              backgroundColor: 'white',
              width: windowWidth * 0.8,
              height: windowHeight * 0.2,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50
            }}
          >
            <View
              style={{
                backgroundColor: '#f1f1f1f1',
                borderRadius: 20,
                borderColor: '#a4a4a4a4',
                borderWidth: 0.2,
                padding: 10,
              }}
            >
              <Text style={{color: 'black'}}>{selectedSocialMediaLink}</Text>
            </View>
            <Pressable
              style={{
                borderWidth: 0.5,
                borderColor: '#a2a2a2a2',
                borderRadius: 30,
                padding: 10,
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>Copy to clipboard</Text>
            </Pressable>

          </View>
        </View>

      </Modal>
    </View>
  );
};

export default AddUserToRoomScreen;