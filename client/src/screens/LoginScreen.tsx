import React, { useContext, useEffect, useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Pressable, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { principalColor } from '../config/colors';

import { Context } from '../context/MainContext';
import style from '../styles/screens/login';
import { signInValidation } from '../validations/signin';

const LoginScreen = ({ navigation }: any) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginDisabled, setLoginDisabled] = useState(false);
  const [errors, setErrors] = useState(signInValidation({ email, password }));
  const [fetchErrorMessage, setFetchErrorMessage] = useState('');
  const [badEmailMessage, setBadEmailMessage] = useState('');
  const [badPasswordMessage, setBadPasswordMessage] = useState('');

  const { signIn, getRooms } = useContext(Context);

  const onChange = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setErrors(signInValidation({ email, password }));
    if (errors.password.length === 0) setBadPasswordMessage('');
    if (errors.email.length === 0) setBadEmailMessage('');
  };

  useEffect(() => { }, [email, password]);

  const handleLogin = () => {

    if (errors.email.length === 0 && errors.password.length === 0) {

      setLoginDisabled(true);

      signIn({ email, password })
        .then(() => {
          setLoginDisabled(false);
          getRooms();
        })
        .catch(() => {
          setFetchErrorMessage('Email or password is invalid.');
          setLoginDisabled(false);
        });
    } else {
      setBadEmailMessage(errors.email);
      setBadPasswordMessage(errors.password);
    }
  };

  return (
    <View style={style.root}>
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: 'white' }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={Keyboard.dismiss}
          >

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
                {
                  fetchErrorMessage.length > 1 &&
                  <Text style={{ color: 'red', fontStyle: 'italic' }}>{fetchErrorMessage}</Text>
                }
                <TextInput
                  style={style.textInput}
                  placeholder="example@gmail.com"
                  placeholderTextColor="#9a9b9c"
                  onChangeText={email => onChange(email, password)}
                  defaultValue={email}
                  value={email}
                  keyboardType='email-address'
                />
                {
                  badEmailMessage.length > 1 &&
                  <Text style={{ color: 'red', fontStyle: 'italic' }}>{badEmailMessage}</Text>
                }
                <Text style={style.textLabel}>Enter your password:</Text>
                <TextInput
                  style={style.textInput}
                  placeholder="******"
                  placeholderTextColor="#9a9b9c"
                  onChangeText={password => onChange(email, password)}
                  defaultValue={password}
                  value={password}
                  secureTextEntry
                />
                {
                  badPasswordMessage.length > 1 &&
                  <Text style={{ color: 'red', fontStyle: 'italic' }}>{badPasswordMessage}</Text>
                }
                {
                  !loginDisabled ?
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
                    :
                    <View style={style.registerContainer}></View>
                }
                <Pressable
                  style={{
                    backgroundColor: principalColor,
                    borderRadius: 20,
                    height: 55,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: loginDisabled ? 0.5 : 1,
                    marginTop: 10,
                  }}
                  onPress={handleLogin}
                >
                  <Text
                    style={style.textButton}
                  >
                    Login
                </Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default LoginScreen;

