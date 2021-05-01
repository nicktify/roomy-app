import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

const Login = () => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  return (
    <>
      <View style={style.root}>
        <View style={style.formContainer}>
          <View>
            <Text style={style.textLabel}>Enter your email:</Text>
            <TextInput
              style={style.textInput}
              placeholder="example@gmail.com"
              onChangeText={ email => setEmail( email ) }
              defaultValue={ email }
              value={ email }
              keyboardType='email-address'
              />
            <Text style={style.textLabel}>Enter your password:</Text>
            <TextInput
              style={style.textInput}
              placeholder="******"
              onChangeText={ password => setPassword(password) }
              defaultValue={ password }
              value={ password }
              secureTextEntry
              />
              <View
                style={style.registerContainer}
              >
                <Text>Don't have an account?</Text>
                <TouchableOpacity>
                  <Text
                    style={style.registerLink}
                  >REGISTER</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={style.loginButton}
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

export default Login;

const style = StyleSheet.create({
  root: {
    flex: 1,
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
    backgroundColor: '#E8E8E8',
    padding: 15,
    borderRadius: 10,
    minWidth: '80%',
    marginBottom: 30,
  },
  textLabel: {
    marginBottom: 10,
    fontSize: 20,
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
  registerLink: {
    color: '#69C1AC',
    fontWeight: 'bold',
    marginLeft: 10
  }
});