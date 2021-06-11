import { Dimensions, StyleSheet } from 'react-native'
import { principalColor } from '../../config/colors';

const windowsWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowsWidth,
  },
  awareScrollView: {
    flex: 1,
    backgroundColor: 'white'
  },
  avoidingView: {
    flex: 1
  },
  withoutFeedback: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    minWidth: '80%',
  },
  title: {
    color: '#69C1AC',
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 15,
    opacity: 0.8,
  },
  textInput: {
    fontSize: 18,
    width: 200,
    color: 'black',
    backgroundColor: '#E8E8E8',
    padding: 15,
    borderRadius: 10,
    minWidth: '80%',
  },
  textLabel: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    opacity: 0.6,
  },
  errorMessage: {
    color: 'red',
    fontStyle: 'italic'
  },
  fetchErrorMessage: {
    color: 'red',
    fontStyle: 'italic',
    width: windowsWidth * 0.8
  },
  forgotPasswordText: {
    color: principalColor,
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'flex-end',
    opacity: 0.8,
  },
  dontHaveAnAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
    opacity: 0.8,
  },
  dontHaveAnAccountText: {
    opacity: 0.6,
  },
  registerText: {
    color: '#69C1AC',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  phantomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    height: 30,
    minWidth: 10,
  },
  loginButton: {
    backgroundColor: principalColor,
    borderRadius: 20,
    height: 55,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white'
  },
  
})

export default styles;