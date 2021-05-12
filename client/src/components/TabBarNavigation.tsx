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
        onPress={ () => navigation.navigate('CreateRoom') }
      >
        <Icon 
          style={[style.navigationBottomIcon, {maxWidth: 25}]}
          name="add"
          color="black"
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={ () => navigation.navigate('Notifications') }
      >
        <Icon 
          style={style.navigationBottomIcon}
          name="people"
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