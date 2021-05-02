import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }: any) => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  return (
    <>
      <View style={style.root}>
        <View style={style.formContainer}>
          <View
            style={style.loginTextContainer}
          >
            <Text
              style={style.loginText}
            >Login</Text>
          </View>
          <View>
            <Text style={style.textLabel}>Enter your email:</Text>
            <TextInput
              style={style.textInput}
              placeholder="example@gmail.com"
              placeholderTextColor="#9a9b9c"
              onChangeText={email => setEmail(email)}
              defaultValue={email}
              value={email}
              keyboardType='email-address'
            />
            <Text style={style.textLabel}>Enter your password:</Text>
            <TextInput
              style={style.textInput}
              placeholder="******"
              placeholderTextColor="#9a9b9c"
              onChangeText={password => setPassword(password)}
              defaultValue={password}
              value={password}
              secureTextEntry
            />
            <View
              style={style.registerContainer}
            >
              <Text
                style={style.dontHaveAnAccountText}
              >Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
              >
                <Text
                  style={style.registerLink}
                >REGISTER</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={style.loginButton}
              onPress={() => navigation.navigate('HomeNavigation')}
            >
              <Text
                style={style.textButton}
              >
                Login
                </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default LoginScreen;

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