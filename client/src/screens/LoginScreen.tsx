import React, { useContext, useEffect, useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Pressable, StyleSheet, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { principalColor } from '../config/colors';

import { Context } from '../context/MainContext';
import { signInValidation } from '../validations/signin';

const windowsWidth = Dimensions.get('window').width;

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
        .catch((result) => {
          setFetchErrorMessage(result);
          setLoginDisabled(false);
        });
    } else {
      setBadEmailMessage(errors.email);
      setBadPasswordMessage(errors.password);
    }
  };

  return (
    <View 
      style={{
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: windowsWidth,
      }}
    >
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

            <View 
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  minWidth: '80%',
                }}
              >
                <Text
                  style={{
                    color: '#69C1AC',
                    fontSize: 50,
                    fontWeight: 'bold',
                    marginBottom: 15,
                  }}
                >
                  Login
                </Text>
              </View>
              <View>
                <Text style={style.textLabel}>
                  Enter your email:
                </Text>
                {
                  fetchErrorMessage.length > 1 &&
                  <Text style={{ color: 'red', fontStyle: 'italic', width: windowsWidth * 0.8 }}>{fetchErrorMessage}</Text>
                }
                <TextInput
                  style={style.textInput}
                  placeholder="example@gmail.com"
                  placeholderTextColor="#9a9b9c"
                  onChangeText={email => onChange(email, password)}
                  defaultValue={email}
                  value={email}
                  keyboardType='email-address'
                  autoFocus
                />
                {
                  badEmailMessage.length > 1 &&
                    <Text style={{ color: 'red', fontStyle: 'italic' }}>{badEmailMessage}</Text>
                }
                <Text style={style.textLabel}>
                  Enter your password:
                </Text>
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
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPassword')}
                >
                  <Text
                    style={{
                      color: principalColor,
                      fontWeight: 'bold',
                      fontSize: 16,
                      alignSelf: 'flex-end',
                    }}
                  >
                    Forgot your password?
                  </Text>
                </TouchableOpacity>
                {
                  !loginDisabled ?
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 20,
                        alignItems: 'center',
                        marginBottom: 20,
                      }}
                    >
                      <Text
                        style={{
                          opacity: 0.6,
                        }}
                      >
                        Don't have an account?
                      </Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Register')}
                      >
                        <Text
                          style={{
                            color: '#69C1AC',
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginLeft: 10,
                          }}
                        >
                          Register
                        </Text>
                      </TouchableOpacity>
                    </View>
                    :
                    <View 
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 20,
                        height: 30,
                        minWidth: 10,
                      }}
                    >
                    </View>
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
                    style={{
                      fontSize: 28,
                      fontWeight: 'bold',
                      color: 'white'
                    }}
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

const style = StyleSheet.create({
  textInput: {
    fontSize: 18,
    width: 200,
    color: 'black',
    backgroundColor: '#E8E8E8',
    padding: 15,
    borderRadius: 10,
    minWidth: '80%',
  },
  textLabel: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    opacity: 0.6,
  },
});

export default LoginScreen;

