import React, { useContext, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Context } from '../context/MainContext';
import HomeRightTopComponent from '../components/HomeRightTopComponent';
import Rooms from '../components/rooms/Rooms';
import RoomOptionsModal from '../components/modals/RoomOptionsModal';
import styles from '../styles/screens/homeScreen';

const HomeScreen = ({ navigation }: any) => {

  const { deleteRoom, user } = useContext(Context);

  const [modalRoomOptions, setModalRoomOptions] = useState(false);
  const [modalConfirmationDeleteRoom, setModalConfirmationDeleteRoom] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [selectedRoomName, setSelectedRoomName] = useState('')

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

  const handleRenameRoom = () => {
    setModalRoomOptions(false);
    navigation.navigate('RenameRoom', {name: selectedRoomName});
  }

  return (
    <View style={styles.container}>
      <View  style={styles.innerContainer}>
        <View  style={styles.topLeftContainer}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon
              style={styles.menuIcon}
              name="menu"
              size={30}
              color="black"
            />
          </TouchableOpacity>
          <View style={styles.greetingContainer}>
            <Text  style={styles.helloText}>
              Hello,
            </Text>
            <Text style={styles.nameText}>
              {` ${user?.name}`}!
            </Text>
          </View>
          <Text style={styles.happyLearningText}>
            Happy learning !
          </Text>
        </View>
        <HomeRightTopComponent />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomInnerContainer}>
          <View style={styles.roomsContainer}>
            <Text style={styles.yourRoomText}>
              Your rooms
            </Text>
            <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('SearchRoom')}>
              <Text style={styles.searchButtonText}>
                Search
              </Text>
              <Icon
                name='search'
                size={30}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          </View>

          <Rooms
            navigation={navigation}
            setModalRoomOptions={setModalRoomOptions}
            setSelectedRoomId={setSelectedRoomId}
            setSelectedRoomName={setSelectedRoomName}
          />

        </View>
      </View>

      <RoomOptionsModal 
        modalRoomOptions={modalRoomOptions}
        setModalRoomOptions={setModalRoomOptions}
        setModalConfirmationDeleteRoom={setModalConfirmationDeleteRoom}
        modalConfirmationDeleteRoom={modalConfirmationDeleteRoom}
        handleDeleteRoom={handleDeleteRoom}
        handleRenameRoom={handleRenameRoom}
      />

    </View>
  );
};

export default HomeScreen;