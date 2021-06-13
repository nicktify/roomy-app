import { StyleSheet } from 'react-native'
import { principalColor } from '../../config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: principalColor,
    fontSize: 30,
    alignSelf: 'center',
    marginTop: 20,
  },
  textInput: {
    fontSize: 18,
    width: 200,
    color: 'black',
    backgroundColor: '#E8E8E8',
    padding: 15,
    borderRadius: 10,
    minWidth: '80%',
    marginBottom: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  changeNameButton: {
    padding: 10,
    backgroundColor: principalColor,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  changeNameButtonText: {
    fontSize: 25,
    color: 'white',
    opacity: 0.8,
  }
})

export default styles;