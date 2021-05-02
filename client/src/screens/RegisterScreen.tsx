import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';

import style from '../styles/screens/register';

const RegisterScreen = ({ navigation }: any) => {

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
              <Text style={style.textLabel}>Enter your name:</Text>
              <TextInput
                style={style.textInput}
                placeholder="Brad Pitt"
                placeholderTextColor="#9a9b9c"
                onChangeText={email => setEmail(email)}
                defaultValue={email}
                value={email}
              />
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
              <Text style={style.textLabel}>Repeat your password:</Text>
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
                >
                  Arleady have an account?
                </Text>
                <TouchableOpacity
                  onPress={ () => navigation.navigate('Login') }
                >
                  <Text
                    style={style.registerLink}
                  >LOGIN</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={style.loginButton}
                onPress={ () => navigation.navigate('HomeNavigation') }
              >
                <Text
                  style={style.textButton}
                >
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    </>
  );
};

export default RegisterScreen;