import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DeleteUserFromRoomConfirmationModal from '../components/modals/DeleteUserFromRoomConfirmationModal';
import UserOnRoomOptionModal from '../components/modals/UserOnRoomOptionModal';
import { principalColor } from '../config/colors';
import { Context } from '../context/MainContext';
import { User } from '../types/user';
import styles from '../styles/screens/searchUserFromRoom';

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
    <View style={styles.renderItemContainer}>
      <View style={styles.renderItemProfilePictureContainer}>
        {
          item.profilePicture ?
            <Image
              style={styles.renderItemProfilePicture}
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
        <Text style={styles.renderItemUserName}>{item.name}</Text>
      </View>
      <View style={styles.renderItemOptionsContainer}>
      {
        selectedRoom && selectedRoom.owners.includes(item.id) &&
          <Text style={styles.renderItemOwnerText}>Owner</Text>
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
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text  style={styles.title}>
          {`Search user from ${selectedRoom?.name}`}
        </Text>
      </View>
      <TextInput
        style={styles.textInput}
        autoFocus
        placeholder='Enter room name'
        placeholderTextColor="#9a9b9c"
        onChangeText={(searchInput) => setSearchInput(searchInput)}
        value={searchInput}
        defaultValue={searchInput}
      />
      {
        showNotFound &&
        <View style={styles.notFoundTextContainer}>
          <Text style={styles.tryAgainText}>User Not Found, please try again.</Text>
          <Text style={styles.correctNameTypeText}>Did you type a correct name?</Text>
        </View>
      }
      {
        searchedResult  &&
          <View style={styles.flatListContainer}>
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