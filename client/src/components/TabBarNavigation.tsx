import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import style from '../styles/navigation';

const TabBarNavigation = ({ navigation }: any) => {
  return (
    <View style={style.navigationBottom}>
      <View style={styles.buttomContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
      >
        <Icon
          style={[style.navigationBottomIcon, { maxWidth: 25, alignSelf: 'center' }]}
          name="home"
          color="black"
          size={25}
        />
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.buttomContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateRoom')}
      >
        <Icon
          style={[style.navigationBottomIcon, { maxWidth: 25, alignSelf: 'center' }]}
          name="add-circle"
          color="black"
          size={25}
        />
        <Text style={styles.text}>Create room</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.buttomContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Notifications')}
      >
        <Icon
          style={[style.navigationBottomIcon, { maxWidth: 25, alignSelf: 'center' }]}
          name="notifications"
          color="black"
          size={25}
        />
        <Text style={styles.text}>Notifications</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.buttomContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
      >
        <Icon
          style={[style.navigationBottomIcon, { maxWidth: 25, alignSelf: 'center' }]}
          name="person"
          color="black"
          size={28}
        />
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttomContainer: {
    width: '25%',
  },
  text: {
    opacity: 0.7,
    fontWeight: '100',
    fontSize: 9,
    alignSelf: 'center',
  },
})

export default TabBarNavigation;