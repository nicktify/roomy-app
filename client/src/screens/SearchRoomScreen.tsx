import React, { useContext, useState } from 'react';
import { Dimensions, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Context } from '../context/MainContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SearchRoomScreen = ({ navigation }: any) => {

  const { rooms, setSelectedRoom, getAllRoomInformation, deleteRoom } = useContext(Context);

  const [searchInput, setSearchInput] = useState('');
  const [modalRoomOptions, setModalRoomOptions] = useState(false);
  const [modalConfirmationDeleteRoom, setModalConfirmationDeleteRoom] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');

  const searchedResult = rooms && rooms.filter(room => room.name.toLowerCase().includes(searchInput.toLocaleLowerCase()));

  const handlePress = (id: string) => {
    setSelectedRoom(id).then(() => {
      getAllRoomInformation(id).then(() => {
        navigation.navigate('Room');
      });
    }).catch(error => console.log(error));
  };

  const handleDeleteRoom = () => {
    deleteRoom(selectedRoomId)
      .then(() => {
        setModalConfirmationDeleteRoom(false);
        setModalRoomOptions(false);
        setSelectedRoomId('');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white'
      }}
    >
      <View
        style={{
          minWidth: '80%',
        }}
      >
        <Text style={{
          color: '#69C1AC',
          fontSize: 30,
          alignSelf: 'center',
          fontWeight: 'bold',
          marginBottom: 15,
        }}>Create room</Text>
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
      <View>
        {
          searchInput.length > 0 &&
          searchedResult && searchedResult.map(room => (
            <View
              style={{
                borderRadius: 10,
                borderColor: '#e3e3e3',
                width: windowWidth * 0.9,
                height: 60,
                backgroundColor: 'white',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: 10,
                marginBottom: 8,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 2,
                flexDirection: 'row'
              }}
              key={room.id}
            >
              <TouchableOpacity
                onPress={() => handlePress(room.id)}
                style={{
                  width: windowWidth * 0.75,
                }}
              >
                <View style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    opacity: 0.7,
                    color: 'black',
                    maxWidth: '90%',
                  }}
                  >{room.name.length > 50 ? room.name.slice(0, 49) + '...' : room.name}</Text>
                </View>
              </TouchableOpacity>
              <Pressable
                onPress={() => {
                  setModalRoomOptions(true);
                  setSelectedRoomId(room.id);
                }}
                style={{ height: '100%', justifyContent: 'center', width: 30, alignItems: 'center', }}
              >
                <Icon
                  name='more-vert'
                  size={25}
                />
              </Pressable>
            </View>
          ))
        }
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalRoomOptions}
        onRequestClose={() => {
          setModalRoomOptions(false);
        }}
      >
        <View style={{ position: 'absolute', backgroundColor: 'black', opacity: 0.5, width: windowWidth, height: windowHeight }}></View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.00,
              elevation: 24,
            }}
          >
            <Pressable
              style={{
                width: 200,
                alignItems: 'center',
                borderRadius: 20,
                padding: 10,
                margin: 10,
                backgroundColor: 'white',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
              onPress={() => setModalConfirmationDeleteRoom(true)}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold', opacity: 0.7 }}>Delete room</Text>
            </Pressable>
            <Pressable
              style={{
                width: 200,
                alignItems: 'center',
                borderRadius: 20,
                padding: 10,
                margin: 10,
                backgroundColor: 'white',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
              onPress={() => setModalRoomOptions(false)}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold', opacity: 0.7 }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalConfirmationDeleteRoom}
        onRequestClose={() => {
          setModalConfirmationDeleteRoom(false);
        }}
      >

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.00,
              elevation: 24,
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 15, }}>Are you sure yo want to delete the room. Once you deleted the room you cannot restore it.</Text>
            <Pressable
              style={{
                width: 200,
                alignItems: 'center',
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
              }}
              onPress={handleDeleteRoom}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold', opacity: 0.9, color: 'white' }}>Yes, delete</Text>
            </Pressable>
            <Pressable
              style={{
                width: 200,
                alignItems: 'center',
                borderRadius: 20,
                padding: 10,
                margin: 10,
                backgroundColor: 'white',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
              onPress={() => setModalConfirmationDeleteRoom(false)}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold', opacity: 0.7 }}>cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SearchRoomScreen;