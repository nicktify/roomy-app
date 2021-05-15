import React, { useContext } from 'react';
import { Pressable, Text, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Context } from '../../context/MainContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Room = ({ name, id, navigation, setModalRoomOptions, setSelectedRoomId }: { name: string, id: string, navigation: any, setModalRoomOptions: any, setSelectedRoomId: any; }) => {

  const { getCurrentRoomPosts } = useContext(Context);

  const handlePress = () => {
    getCurrentRoomPosts(id)
      .then(() => {
        navigation.navigate('Room');
      })
      .catch(error => console.log(error));
  };

  const shortedName = `${name.slice(0, 50)}${name.length > 50 ? '...' : ''}`;

  return (
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
    >
      <TouchableOpacity
        onPress={handlePress}
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
          >{shortedName.length > 50 ? shortedName + '...' : shortedName}</Text>
        </View>
      </TouchableOpacity>
      <Pressable
        onPress={() => {
          setModalRoomOptions(true);
          setSelectedRoomId(id);
        }}
        style={{ height: '100%', justifyContent: 'center', width: 30, alignItems: 'center', }}
      >
        <Icon
          name='more-vert'
          size={25}
        />
      </Pressable>
    </View>
  );
};

export default Room;