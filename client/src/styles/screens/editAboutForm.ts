import { Dimensions, StyleSheet } from 'react-native'
import { principalColor } from '../../config/colors';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20
  },
  title: { 
    fontSize: 30,
    fontWeight: 'bold',
    opacity: 0.8
  },
  textInput: {
    width: windowWidth * 0.9,
    borderRadius: 5,
    borderColor: '#4a4a4a',
    borderWidth: 0.2,
    fontSize: 18,
    paddingHorizontal: 20,
    marginTop: 40,
    color: '#4a4a4a',
  },
  changeAboutButton: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: principalColor,
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    width: windowWidth * 0.5,
    alignSelf: 'center',
  },
  changeAboutButtonText: {
    color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
})

export default styles;