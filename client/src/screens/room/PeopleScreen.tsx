import React, { useContext, useEffect, useState } from 'react';
import { Pressable, Text, View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Context } from '../../context/MainContext';
import UserOnRoomOptionModal from '../../components/modals/UserOnRoomOptionModal';
import DeleteUserFromRoomConfirmationModal from '../../components/modals/DeleteUserFromRoomConfirmationModal';
import { principalColor } from '../../config/colors';
import { User } from '../../types/user';

const windowWidth = Dimensions.get('window').width;

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
    <Pressable
      style={{
        backgroundColor: 'white',
        width: windowWidth * 0.95,
        height: 60,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    <View
      style={{
        flex: 1,
      }}
    >
      <View 
        style={{
          alignItems: 'center',
          borderBottomColor: '#a4a4a4a4',
          borderBottomWidth: 0.5,
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: windowWidth * 0.8,
          alignSelf: 'center',
          marginTop: 10,
        }}
      >
        <Text 
          style={{
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
          onPress={() => navigation.navigate('SearchUserFromRoom')}
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
        style={{
          flex: 1,
          alignItems: 'center',
        }}
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