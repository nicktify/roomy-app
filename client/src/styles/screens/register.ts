import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white'
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
    marginBottom: 30,
  },
  textLabel: {
    marginBottom: 10,
    fontSize: 20,
    opacity: 0.6,
  },
  loginButton: {
    backgroundColor: '#69C1AC',
    borderRadius: 20,
    height: 55,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white'
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  dontHaveAnAccountText: {
    opacity: 0.6,
  },
  registerLink: {
    color: '#69C1AC',
    fontWeight: 'bold',
    marginLeft: 10,
    opacity: 0.6,
  }
});

export default style;