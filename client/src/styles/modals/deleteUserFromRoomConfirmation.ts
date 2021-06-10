import { Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  transparentBackground: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.5,
    position: 'absolute',
    width: windowWidth,
    height: windowHeight
  },
  areYouSureText: {
    fontSize: 18,
    fontWeight: 'bold',
    opacity: 0.8
  },
  touchableOpacity: {
    width: 200,
    borderRadius: 20,
    padding: 10,
    margin: 10,
    backgroundColor: 'red',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  confirmationText: {
    color: 'white',
    opacity: 0.9,
    fontWeight: "bold",
    textAlign: "center",
  }
})