import React, { useContext, useState } from 'react';
import { Dimensions, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Context } from '../context/MainContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SearchRoomScreen = ({ navigation }: any) => {

  const { rooms, setSelectedRoom, getAllRoomInformation } = useContext(Context);

  const [searchInput, setSearchInput] = useState('');

  const searchedResult = rooms && rooms.filter(room => room.name.toLowerCase().includes(searchInput.toLocaleLowerCase()));

  const handlePress = (id: string) => {
    setSelectedRoom(id).then(() => {
      getAllRoomInformation(id).then(() => {
        navigation.navigate('Room');
      })
    }).catch(error => console.log(error))
  }

  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white'
      }}
    >
      <Text style={{ fontSize: 30, opacity: 0.8, marginTop: 20 }}>Search room</Text>
      <TextInput
        style={{
          borderRadius: 20,
          borderColor: 'black',
          borderWidth: 0.1,
          marginTop: 20,
          width: windowWidth * 0.9,
          color: '#4a4a4a',
          fontSize: 18,
          paddingHorizontal: 20,
          marginBottom: 20,
        }}
        autoFocus
        placeholder='Enter room name'
        placeholderTextColor='#4a4a4a'
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
          </View>
          ))
        }
      </View>
    </View>
  );
};

export default SearchRoomScreen;