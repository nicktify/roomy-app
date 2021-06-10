import { Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.5,
    position: 'absolute',
    width: windowWidth, 
    height: windowHeight
  },
  textInput: {
    color: 'black',
    backgroundColor: '#f1f1f1f1',
    width: windowWidth * 0.75,
    borderRadius: 20,
    marginBottom: 20,
  },
  touchableOpacity: {
    width: 200,
    borderRadius: 20,
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
})
