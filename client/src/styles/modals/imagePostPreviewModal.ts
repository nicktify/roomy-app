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
  imageContainer: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
})