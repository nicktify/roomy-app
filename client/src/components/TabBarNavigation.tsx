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
          style={style.navigationBottomIcon}
          name="home"
          color="black"
          size={25}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={ () => navigation.navigate('Calendar') }
      >
        <Icon 
          style={style.navigationBottomIcon}
          name="calendar-today"
          color="black"
          size={20}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={ () => navigation.navigate('Notifications') }
      >
        <Icon 
          style={style.navigationBottomIcon}
          name="notifications-none"
          color="black"
          size={25}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={ () => navigation.navigate('Search') }
      >
        <Icon 
          style={style.navigationBottomIcon}
          name="search"
          color="black"
          size={25}
        />
      </TouchableOpacity>
  </View>
  )
}

export default TabBarNavigation;