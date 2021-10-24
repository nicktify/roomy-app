import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Context } from '../../context/MainContext';
import { signInValidation } from '../../validations/signin';
import styles from '../../styles/screens/login';

const LoginScreen = ({ navigation }: any) => {

  const { signIn, getRooms } = useContext(Context);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginDisabled, setLoginDisabled] = useState(false);
  const [errors, setErrors] = useState(signInValidation({ email, password }));
  const [fetchErrorMessage, setFetchErrorMessage] = useState('');
  const [badEmailMessage, setBadEmailMessage] = useState('');
  const [badPasswordMessage, setBadPasswordMessage] = useState('');

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
    <View style={styles.container}>
      {/* <KeyboardAwareScrollView style={styles.awareScrollView}>
        <KeyboardAvoidingView style={styles.avoidingView}>
          <TouchableWithoutFeedback style={styles.withoutFeedback} onPress={Keyboard.dismiss}> */}
            <View style={styles.innerContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>
                  Login
                </Text>
              </View>
              <View>
                <Text style={styles.textLabel}>
                  Enter your email:
                </Text>
                {
                  fetchErrorMessage.length > 1 &&
                  <Text style={styles.fetchErrorMessage}>{fetchErrorMessage}</Text>
                }
                <TextInput
                  style={styles.textInput}
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
                    <Text style={styles.errorMessage}>{badEmailMessage}</Text>
                }
                <Text style={styles.textLabel}>
                  Enter your password:
                </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="******"
                  placeholderTextColor="#9a9b9c"
                  onChangeText={password => onChange(email, password)}
                  defaultValue={password}
                  value={password}
                  secureTextEntry
                />
                {
                  badPasswordMessage.length > 1 &&
                  <Text style={styles.errorMessage}>{badPasswordMessage}</Text>
                }
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPassword')}
                >
                  <Text style={styles.forgotPasswordText}>
                    Forgot your password?
                  </Text>
                </TouchableOpacity>
                {
                  !loginDisabled ?
                    <View style={styles.dontHaveAnAccountContainer}>
                      <Text style={styles.dontHaveAnAccountText}>
                        Don't have an account?
                      </Text>
                      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.registerText}>
                          Register
                        </Text>
                      </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.phantomContainer}></View>
                }
                <Pressable style={[styles.loginButton, { opacity: loginDisabled ? 0.5 : 1 }]} onPress={handleLogin}>
                  <Text style={styles.loginButtonText}>
                    Login
                  </Text>
                </Pressable>
              </View>
            </View>
          {/* </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </KeyboardAwareScrollView> */}
    </View>
  );
};

export default LoginScreen;

