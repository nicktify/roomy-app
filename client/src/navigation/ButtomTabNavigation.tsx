import * as React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

const TabBar = ({ navigation }: any) => {
  return (
    <View style={style.navigationBottom}>
      <TouchableOpacity
        onPress={ () => navigation.navigate('Home') }
      >
        <Icon
          style={style.navigationBottomIcon}
          name="home"
          color="black"
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={ () => navigation.navigate('Calendar') }
      >
        <Icon 
          style={style.navigationBottomIcon}
          name="calendar-today"
          color="black"
          size={25}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={ () => navigation.navigate('Notifications') }
      >
        <Icon 
          style={style.navigationBottomIcon}
          name="notifications-none"
          color="black"
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={ () => navigation.navigate('Search') }
      >
        <Icon 
          style={style.navigationBottomIcon}
          name="search"
          color="black"
          size={30}
        />
      </TouchableOpacity>
  </View>
  )
}

const style = StyleSheet.create({
  navigationBottom: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navigationBottomIcon: {
    opacity: 0.7,
  },
});

function ButtomTabNavigation() {
  return (
    <Tab.Navigator tabBar={ props => <TabBar { ...props } /> }>
      <Tab.Screen name="Home" component={ HomeScreen } />
      <Tab.Screen name="Calendar" component={ CalendarScreen } />
      <Tab.Screen name="Notifications" component={ NotificationsScreen } />
      <Tab.Screen name="Search" component={ SearchScreen } />
    </Tab.Navigator>
  );
}

export default ButtomTabNavigation;