import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Pressable, Text, View, TextInput, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Context } from '../../context/MainContext';
import { User } from '../../types/user';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PeopleScreen = () => {
  const { selectedRoom, getAllUsersFromRoom } = useContext( Context );

  const [ allUsers, setAllUsers ] = useState<User[]>([]);

  useEffect(() => {
    selectedRoom && getAllUsersFromRoom(selectedRoom?.id)
    .then((result) => {
      setAllUsers(result);
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  const renderItem = ({ item }: { item: User; }) => (
    <Pressable
      style={{
        backgroundColor: 'white',
        width: '100%',
        height: 68,
        borderRadius: 20,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center'
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          marginHorizontal: 10,
        }}
      >
        { 
          item.profilePicture ?
          <Image
            style={{
              borderRadius: 50,
            }}
            source={{
              uri: item.profilePicture
            }}
            width={50}
            height={50}
          />
          :
          <Icon
            name='account-circle'
            size={50}
          />
        }
      </View>
      <Text style={{ fontWeight: 'bold', fontSize: 18, opacity: 0.8 }}>{item.name}</Text>
    </Pressable>
  )



  return (
    <View>
      <View>
        <Text style={{
          fontSize: 22,
          fontWeight: 'bold',
          opacity: 0.8,
          alignSelf: 'center',
          marginTop: 10,
        }}>
          {selectedRoom?.name}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: 15,
          marginTop: 15,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <TextInput
          style={{
            width: windowWidth * 0.8,
            backgroundColor: '#f1f1f1f1',
            borderRadius: 40,
            color: 'black',
            paddingHorizontal: 20,
            borderColor: '#525252',
            borderWidth: 0.2,
            marginLeft: 10,
          }}
        />
        <View
          style={{ width: windowWidth * 0.2 }}
        >
          <Icon
            name="search"
            size={35}
            style={{ alignSelf: 'center', opacity: 0.8 }}
          />
        </View>
      </View>
      <View
        style={{ width: '100%', paddingHorizontal: 10, }}
      >
        <FlatList
          data={allUsers}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}${item.name}`}
          ListFooterComponent={<View style={{ width: '100%', height: 60 }}></View>}
          ListHeaderComponent={<View style={{ width: '100%', height: 20 }}></View>}
        />
      </View>
    </View>
  );
};

export default PeopleScreen;