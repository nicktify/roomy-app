import React, { useContext, useEffect, useState } from 'react';
import { Pressable, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Context } from '../../context/MainContext';
import UserOnRoomOptionModal from '../../components/modals/UserOnRoomOptionModal';
import DeleteUserFromRoomConfirmationModal from '../../components/modals/DeleteUserFromRoomConfirmationModal';
import { principalColor } from '../../config/colors';
import { User } from '../../types/user';
import styles from '../../styles/screens/room/peopleScreen';


const PeopleScreen = ({ navigation }: any) => {

  const { user, selectedRoom, getAllUsersFromRoom, selectedRoomUsers } = useContext(Context);

  const userIsOwner = selectedRoom && user && selectedRoom.owners.includes(user.id);

  const [showModalUserOption, setShowModalUserOption] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModalConfirmationDelete, setShowModalConfirmationDelete] = useState(false);
  const [confirmationDisabledButton, setConfirmationDisabledButton] = useState(false);

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
    <Pressable style={styles.itemContainer}>
      <View style={styles.itemPictureContainer}>
        {
          item.profilePicture ?
            <Image
              style={styles.itemPicture}
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
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
      <View style={styles.itemRightContainer}>
        {
          selectedRoom && selectedRoom.owners.includes(item.id) &&
          <Text style={styles.itemOwnerText}>Owner</Text>
        }
        {
          selectedRoom && user && selectedRoom.owners.includes(user.id) && item.id !== user.id &&
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

  return (
    <View style={styles.container}>
      <View  style={styles.innerContainer}>
        <Text  style={styles.roomParticipantsText}>
          Room participants
        </Text>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => navigation.navigate('SearchUserFromRoom')}
        >
          <Text>Search</Text>
          <Icon
            name='search'
            size={30}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.flatListContainer}>
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
          style={styles.addIcon}
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