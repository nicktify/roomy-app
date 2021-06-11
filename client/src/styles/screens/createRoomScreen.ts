import { Dimensions, StyleSheet } from 'react-native'
import { principalColor } from '../../config/colors';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  awareScrollView: {
    flex: 1,
    backgroundColor: 'white'
  },
  avoidingView: {
    flex: 1
  },
  keyboardDismiss: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleContainer: {
    minWidth: '80%',
  },
  title: {
    color: '#69C1AC',
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  textInput: {
    fontSize: 18,
    width: windowWidth * 0.9,
    color: 'black',
    backgroundColor: '#E8E8E8',
    padding: 15,
    borderRadius: 10,
    minWidth: '80%',
  },
  textLabel: {
    marginTop: 5,
    marginBottom: 2,
    fontSize: 15,
    opacity: 0.6,
  },
  createRoomButton: {
    backgroundColor: principalColor,
    borderRadius: 20,
    height: 55,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

})

export default styles;