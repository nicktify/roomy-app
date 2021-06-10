import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerContainer: {
    backgroundColor: 'white',
    width: windowWidth * 0.8,
    height: windowHeight * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  },
  textContainer: {
    backgroundColor: '#f1f1f1f1',
    borderRadius: 20,
    borderColor: '#a4a4a4a4',
    borderWidth: 0.2,
    padding: 10,
  },
  text: {
    color: 'black'
  },
  touchableOpacity: {
    borderWidth: 0.5,
    borderColor: '#a2a2a2a2',
    borderRadius: 30,
    padding: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default styles;