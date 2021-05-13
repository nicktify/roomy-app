import * as React from 'react';
import { Text, TouchableOpacity, View } from "react-native";

import style from '../styles/navigationTop';

const TabBarRoomNavigation = ({ navigation }: any) => {
  return (
    <View style={style.navigationTop}>
      <TouchableOpacity
        onPress={ () => navigation.navigate('HomeRoomScreen') }
      >
        <Text style={style.text}>POSTS</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={ () => navigation.navigate('BooksRoomScreen') }
      >
        <Text style={style.text}>FORUM</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={ () => navigation.navigate('PeopleRoomScreen') }
      >
        <Text style={style.text}>PEOPLE</Text>
      </TouchableOpacity>
  </View>
  )
}

export default TabBarRoomNavigation;