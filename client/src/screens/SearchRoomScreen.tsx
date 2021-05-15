import React, { useContext, useState } from 'react';
import { Dimensions, Text, TextInput, View } from 'react-native';
import { Context } from '../context/MainContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SearchRoomScreen = () => {

  const { rooms } = useContext( Context );

  const [ searchInput, setSearchInput ] = useState('');

  const searchedResult = rooms && rooms.filter(room => room.name.includes(searchInput))
  console.log(searchedResult)

  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white'
      }}
    >
      <Text style={{fontSize: 25, opacity: 0.8, marginTop: 20}}>Search classroom</Text>
      <TextInput 
        style={{
          borderRadius: 20,
          borderColor: 'black',
          borderWidth: 0.1,
          marginTop: 20,
          width: windowWidth * 0.9,
          color: '#4a4a4a',
          fontSize: 18,
          paddingHorizontal: 20
        }}
        autoFocus
        placeholder='Enter classroom name'
        placeholderTextColor='#4a4a4a'
        onChangeText={(searchInput) => setSearchInput(searchInput)}
        value={searchInput}
        defaultValue={searchInput}
      />
      <View>
        {
          searchInput.length > 0 &&
          searchedResult && searchedResult.map(rooms => (
            <View
              style={{
                backgroundColor: 'white',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 2,
                flexDirection: 'row',
                width: windowWidth * 0.9,
                height: 60,
                marginTop: 20,
                borderRadius: 5,
              }}
              key={rooms.id}
            >
              <Text>{rooms.name}</Text>
            </View>

          ))
        }
      </View>
    </View>
  );
};

export default SearchRoomScreen;