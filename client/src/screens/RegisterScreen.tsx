import React, { useContext, useEffect, useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Context } from '../context/MainContext';

import style from '../styles/screens/register';

const RegisterScreen = ({ navigation }: any) => {

  const [ email, setEmail ] = useState('');
  const [ name, setName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordValidation, setPasswordValidation ] = useState('');
  const [ keyboardState, setKeyboardState ] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow );
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide );

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow );
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide );
    }
  }, [])

  const { userDidRegister, singUp } = useContext( Context );

  useEffect(() => {
    if (userDidRegister) navigation.navigate('Login');
  }, [userDidRegister])

  const _keyboardDidShow = () => setKeyboardState(true);
  const _keyboardDidHide = () => setKeyboardState(false);

  const handleRegister = () => {
    singUp({
      name,
      email,
      password,
      role: 'student',
    })
  }

  return (
    <View style={style.root}>
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: 'white' }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1, marginBottom: keyboardState ? 50 : 0 }}
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
                <Text style={style.textLabel}>Enter your name:</Text>
                <TextInput
                  style={style.textInput}
                  placeholder="Brad Pitt"
                  placeholderTextColor="#9a9b9c"
                  onChangeText={name => setName(name)}
                  defaultValue={name}
                  value={name}
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
                  onChangeText={passwordValidation => setPasswordValidation(passwordValidation)}
                  defaultValue={passwordValidation}
                  value={passwordValidation}
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
                    onPress={() => navigation.navigate('Login')}
                  >
                    <Text
                      style={style.registerLink}
                    >LOGIN</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={style.loginButton}
                  onPress={handleRegister}
                >
                  <Text
                    style={style.textButton}
                  >
                    Register
                </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default RegisterScreen;