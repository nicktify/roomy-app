import { StyleSheet } from "react-native";
import { principalColor } from "../../config/colors";

const style = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  awareScrollView: {
    flex: 1,
    backgroundColor: 'white'
  },
  createAccountText: {
    color: '#69C1AC',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  errorMessage: {
    color: 'red',
    fontStyle: 'italic'
  },
  loginTextContainer: {
    minWidth: '80%',
  },
  loginText: {
    color: '#69C1AC',
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  formContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  textLabel: {
    marginBottom: 10,
    fontSize: 20,
    opacity: 0.6,
  },
  textButton: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white'
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 30,
  },
  dontHaveAnAccountText: {
    opacity: 0.6,
  },
  registerLink: {
    color: '#69C1AC',
    fontWeight: 'bold',
    marginLeft: 10,
    opacity: 0.6,
  },
  existentAccountContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
  existentAccountText: {
    color: '#69C1AC',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 5,
    opacity: 0.6,
  },
  phantomContainer: {
    width: 10,
    height: 30
  },
  continueButtonContainer: {
    backgroundColor: principalColor,
    marginTop: 20,
    borderRadius: 20,
    height: 55,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default style;