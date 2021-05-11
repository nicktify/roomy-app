import React, { useContext, useEffect, useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Pressable } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { principalColor } from '../config/colors';

import { Context } from '../context/MainContext';
import style from '../styles/screens/login';

const validations = (formValues: {email: string, password: string}) => {
  let errors = {
    email: "",
    password: "",
  };

  if (!formValues.email) {
    errors.email = "Email is required";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formValues.email)) {
    errors.email = "Not a well formed email adress.";
  }

  if (!formValues.password) {
    errors.password = "Password is required";
  } 
  // else if (
  //   formValues.password.length > 20 ||
  //   formValues.password.length < 6 ||
  //   !/[a-z]/.test(formValues.password) ||
  //   !/[A-Z]/.test(formValues.password) ||
  //   !/[1-9]/.test(formValues.password)
  // ) {
  //   errors.password = "Password is invalid";
  // }

  return errors;
};



const LoginScreen = ({ navigation }: any) => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loginDisabled, setLoginDisabled ] = useState(false);
  const [ errors, setErrors ] = useState(validations({email, password}));
  const [ fetchErrorMessage, setFetchErrorMessage ] = useState('');
  const [ badEmailMessage, setBadEmailMessage ] = useState('')
  const [ badPasswordMessage, setBadPasswordMessage ] = useState('');

  const { signIn } = useContext( Context );

  const onChange = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setErrors(validations({email, password}));
    if (errors.password.length === 0) setBadPasswordMessage('');
    if (errors.email.length === 0) setBadEmailMessage('');
  }

  useEffect(() => {}, [email, password])

  const handleLogin = () => {
    if (errors.email.length === 0 && errors.password.length === 0) {
      setLoginDisabled(true)
      signIn( { email, password } )
      .then((response) => {
        console.log(response)
        setLoginDisabled(false);
      })
      .catch(error => {
        console.log('screen', error)
        setFetchErrorMessage('Email or password is invalid.');
        setLoginDisabled(false)
      })
    } else {
      setBadEmailMessage(errors.email)
      setBadPasswordMessage(errors.password)
    }
  }

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
                  <Text style={{color: 'red', fontStyle: 'italic'}}>{fetchErrorMessage}</Text>
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
                  <Text style={{color: 'red', fontStyle: 'italic'}}>{badEmailMessage}</Text>
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
                  <Text style={{color: 'red', fontStyle: 'italic'}}>{badPasswordMessage}</Text>
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

