import React, { useContext, useEffect, useState } from 'react';
import { Pressable, Text, View, FlatList, Image, Linking, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { principalColor } from '../../config/colors';
import { Context } from '../../context/MainContext';
import { User } from '../../types/user';

import axios from 'axios';
import { API } from '../../config/environment/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserOnRoomOptionModal from '../../components/modals/UserOnRoomOptionModal';
import DeleteUserFromRoomConfirmationModal from '../../components/modals/DeleteUserFromRoomConfirmationModal';

const PeopleScreen = ({ navigation }: any) => {

  const { 
    user,
    selectedRoom,
    getAllUsersFromRoom,
    handleDeleteUserFromRoom,
    selectedRoomUsers,
  } = useContext(Context);

  const userIsOwner = selectedRoom && user && selectedRoom.owners.includes(user.id);

  const [showModalUserOption, setShowModalUserOption] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModalConfirmationDelete, setShowModalConfirmationDelete] = useState(false);
  const [confirmationDisabledButton, setConfirmationDisabledButton] = useState(false);
  const [activeForm, setActiveForm] = useState(false);
  const [searchUserOnFetchInputValue, setSearchUserOnFetchInputValue] = useState('');
  const [searchedUserOnFetchresult, setSearchedUserOnFetchResult] = useState<User | null>(null);
  const [showNotFound, setShowNotFound] = useState(false);
  const [showProfilePreview, setShowProfilePreview] = useState<User | null>(null);
  const [showPreviewSocialMediaLink, setShowPreviewSocialMediaLink] = useState(false);
  const [selectedSocialMediaLink, setSelectedSocialMediaLink] = useState('');

  useEffect(() => {
    fetchAllUsersFromRoom();
  }, []);

  const fetchAllUsersFromRoom = () => {
    selectedRoom && getAllUsersFromRoom(selectedRoom.id)
      .catch(error => {
        console.log(error);
      });
  };



  const renderItem = ({ item }: { item: User; }) => (
    <Pressable
      style={{
        backgroundColor: 'white',
        width: '100%',
        height: 68,
        borderRadius: 20,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          marginHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {
          item.profilePicture ?
            <Image
              style={{
                borderRadius: 50,
              }}
              source={{
                uri: item.profilePicture
              }}
              width={50}
              height={50}
            />
            :
            <Icon
              name='account-circle'
              size={50}
              color={principalColor}
            />
        }
        <Text style={{ fontWeight: 'bold', fontSize: 18, opacity: 0.8, marginHorizontal: 10, }}>{item.name}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row'
        }}
      >
        {
          selectedRoom && selectedRoom.owners.includes(item.id) &&
          <Text style={{ fontStyle: 'italic', marginRight: 10, }}>Owner</Text>
        }
        {selectedRoom?.owners.includes(user?.id ? user.id : '') &&
        <TouchableOpacity
          onPress={() => {
            setShowModalUserOption(true);
            setSelectedUser(item);
          }}
        >
          <Icon
            name='more-vert'
            size={25}

          />
        </TouchableOpacity>
        }

      </View>
    </Pressable>
  );

  // const fetchSearchedUser = async () => {
  //   const token = await AsyncStorage.getItem('token');
  //   if (!token) return;
  //   const email = searchUserOnFetchInputValue.toLocaleLowerCase();
  //   await axios.get(`${API}/users/get-by-email/${email}`, {
  //     headers: { Authorization: `Bearer ${JSON.parse(token)}` }
  //   })
  //     .then(response => {
  //       if (response.data.msg !== 'User not exist.') {
  //         setSearchedUserOnFetchResult(response.data);
  //         setShowNotFound(false);
  //       }
  //       if (response.data.msg === 'User not exist.') {
  //         setShowNotFound(true);
  //         setSearchedUserOnFetchResult(null)
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       setSearchedUserOnFetchResult(null);
  //       setShowNotFound(true);
  //     });
  // };

  // const handleAddUserToRoom = async () => {
  //   const token = await AsyncStorage.getItem('token');
  //   if (!token) return;
  //   if (!selectedRoom || !user || !searchedUserOnFetchresult) return;
  //   axios.post(`${API}/rooms/newparticipant`, {
  //     id: selectedRoom.id,
  //     owner: user.id,
  //     newParticipant: searchedUserOnFetchresult.id,
  //   }, {
  //     headers: { Authorization: `Bearer ${JSON.parse(token)}` }
  //   })
  //     .then(() => {
  //       fetchAllUsersFromRoom();
  //       setSearchedUserOnFetchResult(null);
  //       setShowNotFound(false);
  //       setActiveForm(false);
  //       setSearchUserOnFetchInputValue('');
  //       setSearchedUserOnFetchResult(null);
  //       setShowPreviewSocialMediaLink(false);
  //       setShowProfilePreview(null);
  //     })
  //     .catch(error => console.log(error));
  // };

  // const handleSocialMediaPress = (type: string) => {
  //   if (type === 'facebook') {
  //     Linking.canOpenURL(showProfilePreview?.socialMediaLinks.facebook!).then(supported => {
  //       if (supported) {
  //         Linking.openURL(showProfilePreview?.socialMediaLinks.facebook!);
  //       } else {
  //         setShowPreviewSocialMediaLink(true);
  //         setSelectedSocialMediaLink(showProfilePreview?.socialMediaLinks.facebook!);
  //       }
  //     });
  //   }
  //   if (type === 'twitter') {
  //     Linking.canOpenURL(showProfilePreview?.socialMediaLinks.twitter!).then(supported => {
  //       if (supported) {
  //         Linking.openURL(showProfilePreview?.socialMediaLinks.twitter!);
  //       } else {
  //         setShowPreviewSocialMediaLink(true);
  //         setSelectedSocialMediaLink(showProfilePreview?.socialMediaLinks.twitter!);
  //       }
  //     });
  //   }
  //   if (type === 'instagram') {
  //     Linking.canOpenURL(showProfilePreview?.socialMediaLinks.instagram!).then(supported => {
  //       if (supported) {
  //         Linking.openURL(showProfilePreview?.socialMediaLinks.instagram!);
  //       } else {
  //         setShowPreviewSocialMediaLink(true);
  //         setSelectedSocialMediaLink(showProfilePreview?.socialMediaLinks.instagram!);
  //       }
  //     });
  //   }
  // };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={{
        alignItems: 'center',
        borderBottomColor: '#a4a4a4a4',
        borderBottomWidth: 0.5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        alignSelf: 'center',
        marginTop: 10,
      }}>
        <Text style={{
          fontSize: 22,
          fontWeight: 'bold',
          opacity: 0.8,
        }}
        >
          Room participants
            </Text>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}
          onPress={() => navigation.navigate('')}
        >
          <Text>Search</Text>
          <Icon
            name='search'
            size={30}
            style={{
              marginLeft: 5,
              opacity: 0.8,
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{ width: '100%', paddingHorizontal: 10, height: '100%' }}
      >
        <FlatList
          data={selectedRoomUsers}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}${item.name}`}
          ListFooterComponent={<View style={{ width: '100%', height: 60 }}></View>}
          ListHeaderComponent={<View style={{ width: '100%', height: 20 }}></View>}

        />
      </View>
      {
        userIsOwner &&
        <Icon
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            margin: 15,
            backgroundColor: principalColor,
            borderRadius: 50,
          }}
          name="add"
          color='white'
          size={40}
          onPress={() => navigation.navigate('AddUserToRoom')}
        />
      }

      <UserOnRoomOptionModal 
        showModalUserOption={showModalUserOption}
        setShowModalUserOption={setShowModalUserOption}
        selectedUser={selectedUser}
        setShowModalConfirmationDelete={setShowModalConfirmationDelete}
      />
      
      <DeleteUserFromRoomConfirmationModal 
        showModalConfirmationDelete={showModalConfirmationDelete}
        setShowModalConfirmationDelete={setShowModalConfirmationDelete}
        confirmationDisabledButton={confirmationDisabledButton}
        setConfirmationDisabledButton={setConfirmationDisabledButton}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        fetchAllUsersFromRoom={fetchAllUsersFromRoom}
        setShowModalUserOption={setShowModalUserOption}
      />
    </View>
  );
};

export default PeopleScreen;