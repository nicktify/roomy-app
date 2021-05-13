import React, { useContext } from 'react';
import { Pressable, Text, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Context } from '../../context/MainContext';

import styles from '../../styles/components/room';

const Room = ( { name, id, navigation, setModalRoomOptions, setSelectedRoomId }: { name: string, id: string, navigation: any, setModalRoomOptions: any, setSelectedRoomId: any }) => {

  const { getCurrentRoomPosts } = useContext( Context );

  const handlePress = () => {
    getCurrentRoomPosts(id)
    .then(() => {
      navigation.navigate('Room')
    })
    .catch(error => console.log(error))
  }
  
  const shortedName = `${name.slice(0, 50)}${name.length > 50 ? '...' : ''}`;

  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
    >
        <View style={styles.roomContainer}>
          <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              opacity: 0.7,
              color: 'black',
              maxWidth: '90%'
            }}
          >{shortedName}</Text>
          <Pressable
            onPress={() => {
              setModalRoomOptions(true)
              setSelectedRoomId(id);
            }}
            style={{height: '100%', justifyContent: 'center', width: 30, alignItems: 'center'}}
            >
            <Icon 
              name='more-vert'
              size={25}
            />
          </Pressable>
        </View>
    </TouchableWithoutFeedback>
  );
};

export default Room;