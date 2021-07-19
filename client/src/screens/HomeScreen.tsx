import React, { useEffect, useContext, useState } from 'react';
import { Text, View, TouchableOpacity, Image, Modal, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Context } from '../context/MainContext';
import Rooms from '../components/rooms/Rooms';
import RoomOptionsModal from '../components/modals/RoomOptionsModal';
import styles from '../styles/screens/homeScreen';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { style as modalStyles } from '../styles/modals/modal';
import { principalColor } from '../config/colors';
import Background from '../components/Background';

type ProfileScreenNavigationProp = DrawerNavigationProp<any>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {
  const [modalRoomOptions, setModalRoomOptions] = useState(false);
  const [modalConfirmationDeleteRoom, setModalConfirmationDeleteRoom] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [selectedRoomName, setSelectedRoomName] = useState('')
  const [modalVisible, setModalVisible] = useState(false);

  const {
    deleteRoom,
    user,
    updateProfilePicture
  } = useContext(Context);

  useEffect(() => { }, [user]);

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

  const handleUploadImage = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5
    }, (resp: ImagePickerResponse) => {
      if (resp.didCancel) return;
      if (!resp.uri) return;

      updateProfilePicture(resp);
      setModalVisible(false);
    });
  };

  const handleTakePicture = () => {
    launchCamera({
      mediaType: 'photo',
      quality: 0.5
    }, (resp: ImagePickerResponse) => {
      if (resp.didCancel) return;
      if (!resp.uri) return;

      updateProfilePicture(resp);
      setModalVisible(false);
    });
  };

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
        <View style={styles.rightTopContainer}>
          <Image
            style={{
              resizeMode: 'contain',
              position: 'absolute',
              alignSelf: 'flex-end',
              top: -10,
              right: 20
            }}
            source={require('../assets/roomy.png')}
            width={50}
            height={50}
          />
          {
            user?.profilePicture ?
              <Pressable
                style={{ flex: 1 }}
                onPress={() => setModalVisible(true)}
              >
                <Image
                  style={{
                    alignSelf: 'flex-end',
                    marginRight: 10,
                    marginTop: 50,
                    height: 80,
                    width: 80,
                    borderRadius: 50,
                  }}
                  source={{
                    uri: user.profilePicture,
                  }}
                  width={80}
                  height={80}
                />
              </Pressable>
              :
              <Icon
                style={styles.profileImage}
                name="account-circle"
                size={80}
                color={principalColor}
                onPress={() => setModalVisible(true)}
              />
          }
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Background />
            <View style={modalStyles.centeredView}>
              <View style={modalStyles.modalView}>
                <Pressable
                  style={modalStyles.button}
                  onPress={handleUploadImage}
                >
                  <Text style={modalStyles.textStyle}>Select from galery</Text>
                </Pressable>
                <Pressable
                  style={modalStyles.button}
                  onPress={handleTakePicture}
                >
                  <Text style={modalStyles.textStyle}>Take picture</Text>
                </Pressable>
                <Pressable
                  style={modalStyles.button}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={modalStyles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
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
