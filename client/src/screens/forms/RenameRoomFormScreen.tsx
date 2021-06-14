import React, { useContext, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Context } from '../../context/MainContext';
import styles from '../../styles/screens/RenameRoomForm';

const RenameRoomFormScreen = ({route, navigation}: any) => {
  
  const { renameRoom, getRooms } = useContext(Context);

  const {name} = route.params;

  const [newName, setNewName] = useState(name);

  const handleRenameRoom = () => {
    renameRoom(newName)
      .then(() => {
        getRooms()
        navigation.navigate('HomeNavigation')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rename room</Text>
      <TextInput 
        style={styles.textInput}
        placeholderTextColor="#9a9b9c"
        onChangeText={name => setNewName(name)}
        defaultValue={newName}
        value={newName}
      />
      <TouchableOpacity style={styles.changeNameButton} onPress={handleRenameRoom}>
        <Text style={styles.changeNameButtonText}>Change name</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RenameRoomFormScreen;