import { Dimensions, StyleSheet } from 'react-native'
import { principalColor } from '../../config/colors';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: '#69C1AC',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 15,
   },
   inputLabel: {
    marginBottom: 10,
    fontSize: 20,
    opacity: 0.6,
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
  },
  errorText: {
    color: 'red',
    fontStyle: 'italic',
  },
  continueButton: {
    backgroundColor: principalColor,
    marginTop: 20,
    borderRadius: 20,
    height: 55,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white'
  },
  
}) 

export default styles;