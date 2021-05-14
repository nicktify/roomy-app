import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Pressable, Text, View, TextInput, FlatList, Image, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { principalColor } from '../../config/colors';
import { Context } from '../../context/MainContext';
import { User } from '../../types/user';

import { style as modalStyles } from '../../styles/components/modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PeopleScreen = () => {
  const { user, selectedRoom, getAllUsersFromRoom, handleDeleteUserFromRoom, makeUserOwnerOfRoom, makeUserParticipantOfRoom } = useContext(Context);

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [showModalUserOption, setShowModalUserOption] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModalConfirmationDelete, setShowModalConfirmationDelete] = useState(false);
  const [confirmationDisabledButton, setConfirmationDisabledButton] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchUsersResult, setSearchUsersResult] = useState<User[]>();
  const [activeForm, setActiveForm] = useState(false);
  const [userEmailOnSearch, setUserEmailOnSearch] = useState('');

  useEffect(() => {
    fetchAllUsersFromRoom();
  }, []);

  useEffect(() => { }, [selectedRoom]);

  const onSearchChange = (value: string) => {
    setSearchValue(value);
    setSearchUsersResult(allUsers.filter(user => user.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())));
  };


  const fetchAllUsersFromRoom = () => {
    selectedRoom && getAllUsersFromRoom(selectedRoom?.id)
      .then((result) => {
        setAllUsers(result);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDeleteUser = () => {

    setConfirmationDisabledButton(true);

    selectedRoom && selectedUser && handleDeleteUserFromRoom(selectedRoom?.id, selectedUser.id)
      .then(() => {
        fetchAllUsersFromRoom();
        setSelectedUser(null);
        setShowModalConfirmationDelete(false);
        setShowModalUserOption(false);
        setConfirmationDisabledButton(false);
      })
      .catch(error => {
        console.log(error);
        setSelectedUser(null);
        setShowModalConfirmationDelete(false);
        setShowModalUserOption(false);
        setConfirmationDisabledButton(false);
      });
  };

  const handleMakeUserOwner = () => {
    selectedUser && makeUserOwnerOfRoom(selectedUser.id)
      .then(result => {
        setShowModalUserOption(false);
      })
      .catch(error => {
        setShowModalUserOption(false);
        console.log(error);
      });
  };

  const handleMakeUserParticipant = () => {
    selectedUser && makeUserParticipantOfRoom(selectedUser.id)
      .then(result => {
        setShowModalUserOption(false);
      })
      .catch(error => {
        setShowModalUserOption(false);
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
          <Icon
            name='more-vert'
            size={25}
            onPress={() => {
              setShowModalUserOption(true);
              setSelectedUser(item);
            }}
          />
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
          height: windowHeight * 0.05
        }}
      >
        <Text style={{
          fontSize: 22,
          fontWeight: 'bold',
          opacity: 0.8,
          alignSelf: 'center',
          marginTop: 10,
        }}>
          {selectedRoom?.name}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          height: windowHeight * 0.1,
          paddingVertical: 15,
          marginTop: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
          <TextInput
            style={{
              width: windowWidth * 0.9,
              backgroundColor: '#f1f1f1f1',
              borderRadius: 40,
              paddingHorizontal: 20,
              borderColor: '#525252',
              borderWidth: 0.2,
              marginLeft: 10,
              flexDirection: 'row',
              color: 'black',
              fontSize: 18
            }}
            placeholder='Search user'
            placeholderTextColor='#4a4a4a'
            autoFocus={false}
            onChangeText={(searchValue) => onSearchChange(searchValue)}
            value={searchValue}
            defaultValue={searchValue}
          />
      </View>
      <View
        style={{ width: '100%', paddingHorizontal: 10, height: '100%' }}
      >
        <FlatList
          data={searchValue.length > 0 ? searchUsersResult : allUsers}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}${item.name}`}
          ListFooterComponent={<View style={{ width: '100%', height: 60 }}></View>}
          ListHeaderComponent={<View style={{ width: '100%', height: 20 }}></View>}
          
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          flexDirection: 'row',
          width: 120,
          marginBottom: 10,
          justifyContent: 'center',
          alignItems:'center'
          
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems:'center'
          }}
        >
          <Text style={{fontSize: 10}}>Add user</Text>
          <Icon
            style={{
              backgroundColor: principalColor,
              borderRadius: 50,
              marginLeft: 5,
            }}
            name="add"
            color='white'
            size={40}
          />
          
        </View>

      </View>

      {/* User option modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalUserOption}
        onRequestClose={() => {
          setShowModalUserOption(!showModalUserOption);
        }}
      >
        <View
          style={{ flex: 1, backgroundColor: 'black', opacity: 0.5, position: 'absolute', width: windowWidth, height: windowHeight }}
        >
        </View>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <View
              style={{
                width: 280,
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                elevation: 4,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  marginHorizontal: 10,
                }}
              >
                {
                  selectedUser?.profilePicture ?
                    <Image
                      style={{
                        borderRadius: 50,
                      }}
                      source={{
                        uri: selectedUser.profilePicture
                      }}
                      width={40}
                      height={40}
                    />
                    :
                    <Icon
                      name='account-circle'
                      size={40}
                      color={principalColor}
                    />
                }
              </View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', opacity: 0.8 }}>{selectedUser?.name}</Text>
            </View>
            {
              selectedUser && selectedRoom && selectedRoom.participants.includes(selectedUser.id) ?
                <Pressable
                  style={modalStyles.button}
                  onPress={handleMakeUserOwner}
                >
                  <Text style={modalStyles.textStyle}>Make owner</Text>
                </Pressable>
                :
                <Pressable
                  style={modalStyles.button}
                  onPress={handleMakeUserParticipant}
                >
                  <Text style={modalStyles.textStyle}>Remove as owner</Text>
                </Pressable>
            }
            <Pressable
              style={modalStyles.button}
              onPress={() => setShowModalConfirmationDelete(true)}
            >
              <Text style={modalStyles.textStyle}>Delete user from room</Text>
            </Pressable>
            <Pressable
              style={modalStyles.button}
              onPress={() => setShowModalUserOption(!showModalUserOption)}
            >
              <Text style={modalStyles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModalConfirmationDelete}
          onRequestClose={() => {
            setShowModalConfirmationDelete(!showModalConfirmationDelete);
          }}
        >
          <View
            style={{ flex: 1, backgroundColor: 'black', opacity: 0.5, position: 'absolute', width: windowWidth, height: windowHeight }}
          >
          </View>
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>

              <Text style={{ fontSize: 18, fontWeight: 'bold', opacity: 0.8 }}>Are you sure you want to delete the user from this room?</Text>
              <Pressable
                style={{
                  width: 200,
                  borderRadius: 20,
                  padding: 10,
                  margin: 10,
                  backgroundColor: 'red',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  opacity: confirmationDisabledButton ? 0.5 : 1
                }}
                onPress={handleDeleteUser}
              >
                <Text style={{
                  color: 'white',
                  opacity: 0.9,
                  fontWeight: "bold",
                  textAlign: "center",
                }}>Yes, delete</Text>
              </Pressable>
              <Pressable
                style={modalStyles.button}
                onPress={() => setShowModalConfirmationDelete(!showModalConfirmationDelete)}
              >
                <Text style={modalStyles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </Modal>
    </View>
  );
};

export default PeopleScreen;