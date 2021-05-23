import React, { useContext, useEffect, useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Modal, Pressable, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { principalColor } from '../config/colors';
import { Context } from '../context/MainContext';

import style from '../styles/screens/register';
import { style as modalStyles } from '../styles/components/modal';
import { signUpValidation } from '../validations/signup';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RegisterScreen = ({ navigation }: any) => {

  const { singUp } = useContext(Context);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => setKeyboardState(true);
  const _keyboardDidHide = () => setKeyboardState(false);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [keyboardState, setKeyboardState] = useState(false);
  const [registerDisabled, setRegisterDisabled] = useState(false);
  const [errors, setErrors] = useState(signUpValidation(email, password, name));
  const [fetchErrorMessage, setFetchErrorMessage] = useState('');
  const [badNameMessage, setBadNameMessage] = useState('');
  const [badEmailMessage, setBadEmailMessage] = useState('');
  const [badPasswordMessage, setBadPasswordMessage] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [modalRegisterSuccess, setModalRegisterSuccess] = useState(false);

  const onChange = (name: string, email: string, password: string, repeatedPassword: string) => {
    setName(name);
    setEmail(email);
    setPassword(password);
    setRepeatedPassword(repeatedPassword);
    setErrors(signUpValidation(email, password, name));

    if (password !== repeatedPassword) setPasswordMatchError(true);
    else setPasswordMatchError(false);

    if (errors.name.length === 0) setBadNameMessage('');
    if (errors.email.length === 0) setBadEmailMessage('');
    if (errors.password.length === 0) setBadPasswordMessage('');
  };

  useEffect(() => {
    if (errors.name.length === 0) setBadNameMessage('');
    if (errors.email.length === 0) setBadEmailMessage('');
    if (errors.password.length === 0) setBadPasswordMessage('');
  }, [name, email, password, repeatedPassword, errors]);

  const handleRegister = () => {
    if (password !== repeatedPassword) setPasswordMatchError(true);
    if (errors.email.length === 0 && errors.password.length === 0 && errors.name.length === 0 && !passwordMatchError && !registerDisabled) {
      setRegisterDisabled(true);
      singUp({
        name,
        email,
        password,
      })
        .then((response) => {
          console.log(response)
          if (response.msg === 'Register success. Please confirm your email.') {
            setModalRegisterSuccess(true);
            setName('')
            setEmail('')
            setPassword('')
            setRepeatedPassword('')
          }
          if (response.msg === 'Email already registered, try another or log in.') {
            setFetchErrorMessage(response.msg);
          }
          setRegisterDisabled(false);
        })
        .catch(() => {
          setFetchErrorMessage('Something went wrong. Please try again.');
        });
    } else {
      setBadNameMessage(errors.name);
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
                >Register</Text>
              </View>
              <View>
                <Text style={style.textLabel}>Enter your name:</Text>
                <TextInput
                  style={style.textInput}
                  placeholder="Your Name"
                  placeholderTextColor="#9a9b9c"
                  onChangeText={name => onChange(name, email, password, repeatedPassword)}
                  defaultValue={name}
                  value={name}
                />
                {
                  badNameMessage.length > 1 &&
                  <Text style={{ color: 'red', fontStyle: 'italic' }}>{badNameMessage}</Text>
                }
                <Text style={style.textLabel}>Enter your email:</Text>
                <TextInput
                  style={style.textInput}
                  placeholder="example@gmail.com"
                  placeholderTextColor="#9a9b9c"
                  onChangeText={email => onChange(name, email, password, repeatedPassword)}
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
                  onChangeText={password => onChange(name, email, password, repeatedPassword)}
                  defaultValue={password}
                  value={password}
                  secureTextEntry
                />
                {
                  badPasswordMessage.length > 1 &&
                  <Text style={{ color: 'red', fontStyle: 'italic' }}>{badPasswordMessage}</Text>
                }
                <Text style={style.textLabel}>Repeat your password:</Text>
                <TextInput
                  style={style.textInput}
                  placeholder="******"
                  placeholderTextColor="#9a9b9c"
                  onChangeText={repeatedPassword => onChange(name, email, password, repeatedPassword)}
                  defaultValue={repeatedPassword}
                  value={repeatedPassword}
                  secureTextEntry
                />
                {
                  passwordMatchError &&
                  <Text style={{ color: 'red', fontStyle: 'italic' }}>Password needs to be equal.</Text>
                }
                {
                  !registerDisabled ?
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
                    :
                    <View style={{ width: 10, height: 30 }}></View>
                }
                <Pressable
                  style={{
                    backgroundColor: principalColor,
                    marginTop: 20,
                    borderRadius: 20,
                    height: 55,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: registerDisabled ? 0.5 : 1,
                  }}
                  onPress={handleRegister}
                >
                  <Text
                    style={style.textButton}
                  >
                    Register
                </Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </KeyboardAwareScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalRegisterSuccess}
      >
        <View
          style={{ flex: 1, backgroundColor: 'black', opacity: 0.5, position: 'absolute', width: windowWidth, height: windowHeight }}
        >
        </View>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text>You have been registered successfuly. Please, check your email inbox and confirm your email.</Text>
            <Pressable
              style={modalStyles.button}
              onPress={() => {
                navigation.navigate('Login');
                setModalRegisterSuccess(false);
              }}
            >
              <Text style={modalStyles.textStyle}>Login</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={fetchErrorMessage.length > 0}
        onRequestClose={() => setFetchErrorMessage('')}
      >
        <View
          style={{ flex: 1, backgroundColor: 'black', opacity: 0.5, position: 'absolute', width: windowWidth, height: windowHeight }}
        >
        </View>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text>{fetchErrorMessage}</Text>
            <Pressable
              style={modalStyles.button}
              onPress={() => {
                setFetchErrorMessage('')
              }}
            >
              <Text style={modalStyles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RegisterScreen;