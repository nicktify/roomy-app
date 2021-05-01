import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const HomeScreen = () => {
  return (
    <>
      <View style={style.root}>
        <View style={style.topContainer}>
          <View style={style.leftTopContainer}>
            <Image
              source={require('../assets/draw-indicator.png')}
              style={style.toggleIcon}
            />
            <View style={style.welcomeMessage}>
              <Text style={style.helloText}>Hello, </Text>
              <Text style={style.nameText}>Name!</Text>
            </View>
            <Text style={style.happyLearningText}>Happy learning !</Text>
          </View>
          <View style={style.rightTopContainer}>
            <Image 
              style={style.profileImage}
              source={require('../assets/user-avatar.png')}
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
          <Image 
            style={style.navigationBottomIcon}
            source={require('../assets/home-icon.png')}
          />
          <Image 
            style={style.navigationBottomIconCalendar}
            source={require('../assets/calendar-icon.png')}
          />
          <Image 
            style={style.navigationBottomIconNotification}
            source={require('../assets/notification-icon.png')}
          />
          <Image 
            style={style.navigationBottomIcon}
            source={require('../assets/search-icon.png')}
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
    width: 40,
    height: 40,
    margin: 20,
    marginTop: 40,
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
    width: 70,
    height: 70,
    alignSelf: 'flex-end',
    marginRight: 30,
    marginTop: 20,
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
    alignItems: 'center'
  },
  navigationBottomIcon: {
    width: 40,
    height: 40,
    opacity: 0.7,
  },
  navigationBottomIconCalendar: {
    width: 30,
    height: 30,
    opacity: 0.7,
  },
  navigationBottomIconNotification: {
    width: 38,
    height: 38,
    opacity: 0.7,
  }
})