import axios from 'axios';
import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { API } from '../config/constants';

import style from '../styles/screens/login';

const LoginScreen = ({ navigation }: any) => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleLogin = () => {
      axios.post(`${ API }/users/auth/login`, {
          email,
          password,
        })
        .then(response => {
          console.log(response.data)
          navigation.navigate('HomeNavigation');
        })
        .catch(error => {
          console.log(error)
        })
  }

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
              // onPress={() => navigation.navigate('HomeNavigation')}
              onPress={handleLogin}
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

