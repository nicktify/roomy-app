import React, { useContext, useState } from 'react';
import { Dimensions, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ConfirmationDeleteRoomModal from '../components/modals/ConfirmationDeleteRoomModal';
import RoomOptionsModal from '../components/modals/RoomOptionsModal';
import { Context } from '../context/MainContext';
import styles from '../styles/screens/searchRoom';

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
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Create room</Text>
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
      <View>
        {
          searchInput.length > 0 &&
          searchedResult && searchedResult.map(room => (
            <View style={styles.roomContainer} key={room.id}>
              <TouchableOpacity onPress={() => handlePress(room.id)} style={styles.touchableRoom}>
                <View style={styles.roomNameContainer}>
                  <Text style={styles.roomNameText}>
                    {room.name.length > 50 ? room.name.slice(0, 49) + '...' : room.name}
                  </Text>
                </View>
              </TouchableOpacity>
              <Pressable
                onPress={() => {
                  setModalRoomOptions(true);
                  setSelectedRoomId(room.id);
                }}
                style={styles.moreVertIcon}
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

      <RoomOptionsModal
        modalRoomOptions={modalRoomOptions}
        setModalRoomOptions={setModalRoomOptions}
        setModalConfirmationDeleteRoom={setModalConfirmationDeleteRoom}
        modalConfirmationDeleteRoom={modalConfirmationDeleteRoom}
        handleDeleteRoom={handleDeleteRoom}
      />

      <ConfirmationDeleteRoomModal
        modalConfirmationDeleteRoom={modalConfirmationDeleteRoom}
        setModalConfirmationDeleteRoom={setModalConfirmationDeleteRoom}
        handleDeleteRoom={handleDeleteRoom}
      />
      
    </View>
  );
};

export default SearchRoomScreen;