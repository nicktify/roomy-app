import React, { useContext, useEffect, useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Modal, Pressable, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Context } from '../../context/MainContext';
import styles from '../../styles/screens/register';
import { style as modalStyles } from '../../styles/modals/modal';
import { signUpValidation } from '../../validations/signup';
import RegisterSuccessModal from '../../components/modals/RegisterSuccessModal';

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
    if (
      errors.email.length === 0
      && errors.password.length === 0
      && errors.name.length === 0
      && !passwordMatchError
      && !registerDisabled
    ) {
      setRegisterDisabled(true);
      singUp({
        name,
        email,
        password,
      })
        .then((response) => {
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
    <View style={styles.root}>
      <View style={styles.formContainer}>
        <View style={styles.loginTextContainer}>
          <Text style={styles.createAccountText}>
            Create an account
          </Text>
        </View>
        <View>
          <Text style={styles.textLabel}>Enter your name:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Your Name"
            placeholderTextColor="#9a9b9c"
            onChangeText={name => onChange(name, email, password, repeatedPassword)}
            defaultValue={name}
            value={name}
          />
          {
            badNameMessage.length > 1 &&
            <Text style={styles.errorMessage}>{badNameMessage}</Text>
          }
          <Text style={styles.textLabel}>Enter your email:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="example@gmail.com"
            placeholderTextColor="#9a9b9c"
            onChangeText={email => onChange(name, email, password, repeatedPassword)}
            defaultValue={email}
            value={email}
            keyboardType='email-address'
          />
          {
            badEmailMessage.length > 1 &&
            <Text style={styles.errorMessage}>{badEmailMessage}</Text>
          }
          <Text style={styles.textLabel}>Enter your password:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="******"
            placeholderTextColor="#9a9b9c"
            onChangeText={password => onChange(name, email, password, repeatedPassword)}
            defaultValue={password}
            value={password}
            secureTextEntry
          />
          {
            badPasswordMessage.length > 1 &&
            <Text style={styles.errorMessage}>{badPasswordMessage}</Text>
          }
          <Text style={styles.textLabel}>Repeat your password:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="******"
            placeholderTextColor="#9a9b9c"
            onChangeText={repeatedPassword => onChange(name, email, password, repeatedPassword)}
            defaultValue={repeatedPassword}
            value={repeatedPassword}
            secureTextEntry
          />
          {
            passwordMatchError &&
            <Text style={styles.errorMessage}>Password needs to be equal.</Text>
          }
          {
            !registerDisabled ?
              <View style={styles.existentAccountContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.existentAccountText}>
                    Arleady have an account?
                  </Text>
                </TouchableOpacity>
              </View>
              :
              <View style={styles.phantomContainer}></View>
          }
          <Pressable
            style={[styles.continueButtonContainer, { opacity: registerDisabled ? 0.5 : 1 }]}
            onPress={handleRegister}
          >
            <Text
              style={styles.textButton}
            >
              Continue
            </Text>
          </Pressable>
        </View>
      </View>
      <RegisterSuccessModal 
        modalRegisterSuccess={modalRegisterSuccess} 
        navigation={navigation} 
        setModalRegisterSuccess={setModalRegisterSuccess}
      />
      
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
