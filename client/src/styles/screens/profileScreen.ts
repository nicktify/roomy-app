import { Dimensions, StyleSheet } from 'react-native'
import { principalColor } from '../../config/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    width: windowWidth,
    height: 250
  },
  profileBackgroundImage: {
    width: '100%',
    height: '100%'
  },
  phantomContainer: {
    backgroundColor: '#a1a1a1a1',
    width: windowWidth,
    height: windowHeight * 0.30,
  },
  profilePictureContainer: {
    width: windowWidth,
    bottom: 50,
  },
  touchableProfilePicture: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  profilePictureImage: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  phantomTouchableProfilePicture: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: 'black'
  },
  nameContainer: {
    width: windowWidth,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameText: {
    fontSize: 30,
    fontWeight:
    'bold',
    opacity: 0.8
  },
  aboutContainer: {
    borderTopColor: 'black',
    borderTopWidth: 1,
    width: '90%',
    paddingTop: 10,
    paddingBottom: 10,
  },
  aboutTextTitle: {
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
    marginBottom: 10,
  },
  editAboutButton: {
    alignItems: 'center',
    backgroundColor: principalColor,
    borderRadius: 10,
    padding: 5,
    justifyContent: 'center',
    marginTop: 18,
    width: windowWidth * 0.5,
    alignSelf: 'center',
  },
  editAboutText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
  },
  addButton: {
    width: 80,
    marginTop: 30,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  
})

export default styles;