import React, { useContext } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Context } from '../../context/MainContext';

import styles from '../../styles/components/room';

const Room = ( { name, id, navigation }: { name: string, id: string, navigation: any } ) => {

  const { getCurrentRoomInformation } = useContext( Context );

  const handlePress = () => {


    getCurrentRoomInformation(id)
    .then(() => {
      navigation.navigate('Room')
    })
    .catch(error => console.log(error))

  }

  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
    >
      <View style={styles.roomContainer}>
        <Text style={styles.roomName}>{ name }</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Room;