import * as React from 'react';
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import style from '../styles/navigation';

const TabBarNavigation = ({ navigation }: any) => {
  return (
    <View style={style.navigationBottom}>
      <TouchableOpacity
        onPress={ () => navigation.navigate('Home') }
      >
        <Icon
          style={[style.navigationBottomIcon, {maxWidth: 25}]}
          name="home"
          color="black"
          size={25}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={ () => navigation.navigate('CreateRoom') }
      >
        <Icon 
          style={[style.navigationBottomIcon, {maxWidth: 25}]}
          name="add-circle"
          color="black"
          size={25}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={ () => navigation.navigate('Notifications') }
      >
        <Icon 
          style={[style.navigationBottomIcon, {maxWidth: 25}]}
          name="notifications"
          color="black"
          size={25}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={ () => navigation.navigate('Profile') }
      >
        <Icon 
          style={[style.navigationBottomIcon, {maxWidth: 25}]}
          name="person"
          color="black"
          size={28}
        />
      </TouchableOpacity>
  </View>
  )
}

export default TabBarNavigation;