import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = () => {
  return (
    <>
      <View style={style.root}>
        <View style={style.topContainer}>
          <View style={style.leftTopContainer}>
            <Icon
              style={style.toggleIcon}
              name="menu"
              size={30}
              color="black"
            />
            <View style={style.welcomeMessage}>
              <Text style={style.helloText}>Hello, </Text>
              <Text style={style.nameText}>Name!</Text>
            </View>
            <Text style={style.happyLearningText}>Happy learning !</Text>
          </View>
          <View style={style.rightTopContainer}>
          <Icon 
              style={style.profileImage}
              name="account-circle"
              size={50}
            />
          </View>
        </View>
        <View style={style.bottomContainer}>
          <View style={style.roomContainer}>
            <Text style={style.roomName}>Room name</Text>
            <Text style={style.roomDescription}>Room description</Text>
          </View>
          <View style={style.roomContainer}>
            <Text style={style.roomName}>Room name</Text>
            <Text style={style.roomDescription}>Room description</Text>
          </View>
          <View style={style.roomContainer}>
            <Text style={style.roomName}>Room name</Text>
            <Text style={style.roomDescription}>Room description</Text>
          </View>
        </View>
        <View style={style.navigationBottom}>
          <Icon
            style={style.navigationBottomIcon}
            name="home"
            color="black"
            size={30}
          />
          <Icon 
            style={style.navigationBottomIcon}
            name="calendar-today"
            color="black"
            size={25}
          />
          <Icon 
            style={style.navigationBottomIcon}
            name="notifications-none"
            color="black"
            size={30}
          />
          <Icon 
            style={style.navigationBottomIcon}
            name="search"
            color="black"
            size={30}
          />
        </View>
      </View>
    </>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white'
  },
  topContainer: {
    flex: 0.3,
    flexDirection: 'row'
  },
  leftTopContainer: {
    flex: 1,
  },
  rightTopContainer: {
    flex: 1,
  },
  bottomContainer: {
    flex: 0.7,
    backgroundColor: '#f1f1f1',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    alignItems: 'center'
  },
  toggleIcon: {
    marginLeft: 30,
    marginTop: 40,
    marginBottom: 30,
    opacity: 0.8
  },
  welcomeMessage: {
    flexDirection: 'row',
    marginLeft: 30,
  },
  helloText: {
    fontSize: 20,
    fontWeight: '100',
    opacity: 0.5,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8
  },
  happyLearningText: {
    marginLeft: 30,
    marginTop: 10,
    fontWeight: '100',
    opacity: 0.3
  },
  profileImage: {
    alignSelf: 'flex-end',
    marginRight: 40,
    marginTop: 30,
    opacity: 0.8,
  },
  roomContainer: {
    width: '90%',
    height: 100,
    backgroundColor: 'white',
    marginTop: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  roomName: {
    fontSize: 30,
    fontWeight: 'bold',
    opacity: 0.8
  },
  roomDescription: {
    fontSize: 10,
    fontWeight: '500',
    opacity: 0.8
  },
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