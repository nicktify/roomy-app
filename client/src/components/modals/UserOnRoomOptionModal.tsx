import React, { useContext } from 'react';
import { Dimensions, Image, Modal, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { principalColor } from '../../config/colors';
import { Context } from '../../context/MainContext';
import { style as modalStyles } from '../../styles/components/modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UserOnRoomOptionModal = ({
  showModalUserOption,
  setShowModalUserOption,
  selectedUser,
  setShowModalConfirmationDelete,
}: any) => {

  const { 
    selectedRoom,
    makeUserOwnerOfRoom,
    makeUserParticipantOfRoom,
  } = useContext(Context);


  const handleMakeUserOwner = () => {
    selectedUser && makeUserOwnerOfRoom(selectedUser.id)
      .then(() => {
        setShowModalUserOption(false);
      })
      .catch(error => {
        setShowModalUserOption(false);
        console.log(error);
      });
  };

  const handleMakeUserParticipant = () => {
    selectedUser && makeUserParticipantOfRoom(selectedUser.id)
      .then(() => {
        setShowModalUserOption(false);
      })
      .catch(error => {
        setShowModalUserOption(false);
        console.log(error);
      });
  };

  return (
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
            <TouchableOpacity
              style={modalStyles.button}
              onPress={handleMakeUserOwner}
            >
              <Text style={modalStyles.textStyle}>Make owner</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
              style={modalStyles.button}
              onPress={handleMakeUserParticipant}
            >
              <Text style={modalStyles.textStyle}>Remove as owner</Text>
            </TouchableOpacity>
        }
        <TouchableOpacity
          style={modalStyles.button}
          onPress={() => setShowModalConfirmationDelete(true)}
        >
          <Text style={modalStyles.textStyle}>Delete user from room</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={modalStyles.button}
          onPress={() => setShowModalUserOption(!showModalUserOption)}
        >
          <Text style={modalStyles.textStyle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  );
};

export default UserOnRoomOptionModal;