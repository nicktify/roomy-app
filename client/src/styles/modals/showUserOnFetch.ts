import { StyleSheet, Dimensions } from 'react-native';
import { principalColor } from '../../config/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerContainer: {
    backgroundColor: 'white',
    width: windowWidth * 0.9,
    height: windowHeight * 0.8,
  },
  profileImageContainer: {
    backgroundColor: '#a8a8a8a8',
    height: 150,
  },
  profileBackground: {
    width: '100%',
    height: '100%',
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    position: 'absolute',
    bottom: -50,
    alignSelf: 'center',
  },
  touchableOpacity: {
    width: 80,
    backgroundColor: 'black',
    height: 80,
    borderRadius: 50,
    position: 'absolute',
    bottom: -50,
    alignSelf: 'center',
  },
  socialMediaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 60
  },
  bottomContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  aboutText: {
    color: 'black'
  },
  actionContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  userOnRoomText: {
    color: 'red',
    fontStyle: 'italic'
  },
  addButton: {
    backgroundColor: principalColor,
    borderRadius: 10,
    width: windowWidth * 0.4,
    paddingVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  addText: {
    color: 'white'
  }
})

export default styles;