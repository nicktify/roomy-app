import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DeleteUserFromRoomConfirmationModal from '../components/modals/DeleteUserFromRoomConfirmationModal';
import UserOnRoomOptionModal from '../components/modals/UserOnRoomOptionModal';
import { principalColor } from '../config/colors';
import { Context } from '../context/MainContext';
import { User } from '../types/user';

const windowWidth = Dimensions.get('window').width;

const SearchUserFromRoom = () => {

  const { selectedRoomUsers, user, selectedRoom, getAllUsersFromRoom } = useContext(Context);

  const [searchInput, setSearchInput] = useState('');
  const [showNotFound, setShowNotFound] = useState(false);
  const [showModalUserOption, setShowModalUserOption] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModalConfirmationDelete, setShowModalConfirmationDelete] = useState(false);
  const [confirmationDisabledButton, setConfirmationDisabledButton] = useState(false);

  const searchedResult = selectedRoomUsers && selectedRoomUsers.filter(user => user.name.toLowerCase().includes(searchInput.toLocaleLowerCase()));

  useEffect(() => {
    if (searchedResult && searchedResult.length === 0) setShowNotFound(true);
    else setShowNotFound(false);
  }, [searchInput])

  const fetchAllUsersFromRoom = () => {
    selectedRoom && getAllUsersFromRoom(selectedRoom.id)
      .catch(error => {
        console.log(error);
      });
  };

  const renderItem = ({ item }: { item: User; }) => (
    <View
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
      {
        selectedRoom?.owners.includes(user?.id ? user.id : '') &&
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
    </View>
  );

  return (
    <View style={{ flex: 1, alignItems: 'center'}}>
      <View
        style={{
          minWidth: '80%',
        }}
      >
        <Text 
          style={{
            color: '#69C1AC',
            fontSize: 30,
            alignSelf: 'center',
            fontWeight: 'bold',
            marginBottom: 15,
          }}
        >
          {`Search user from ${selectedRoom?.name}`}
        </Text>
      </View>
      <TextInput
        style={{
          fontSize: 18,
          width: windowWidth * 0.9,
          color: 'black',
          backgroundColor: '#E8E8E8',
          padding: 15,
          borderRadius: 10,
          minWidth: '80%',
          marginBottom: 40,
        }}
        autoFocus
        placeholder='Enter room name'
        placeholderTextColor="#9a9b9c"
        onChangeText={(searchInput) => setSearchInput(searchInput)}
        value={searchInput}
        defaultValue={searchInput}
      />
      {
        showNotFound &&
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 30, opacity: 0.8, marginTop: 20 }}>User Not Found, please try again.</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 15, opacity: 0.8, marginTop: 20 }}>Did you type a correct name?</Text>
        </View>
      }
      {
        searchedResult  &&
          <View
              style={{ width: '100%', paddingHorizontal: 10, height: '100%' }}
          >
            <FlatList
              data={searchedResult}
              renderItem={renderItem}
              keyExtractor={item => `${item.id}${item.name}`}
              ListFooterComponent={<View style={{ width: '100%', height: 60 }}></View>}
              ListHeaderComponent={<View style={{ width: '100%', height: 20 }}></View>}
            />
          </View>
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

export default SearchUserFromRoom;