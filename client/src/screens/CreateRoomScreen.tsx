import * as React from 'react';
import { Keyboard, KeyboardAvoidingView, Pressable, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { principalColor } from '../config/colors';
import { Context } from '../context/MainContext';

import style from '../styles/screens/login';
import { createRoomValidations } from '../validations/createRoom';

const CreateRoomScreen = ({ navigation }: any) => {

  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatedPassword, setRepeatedPassword] = React.useState('');
  const [createDisabled, setCreateDisabled] = React.useState(false);
  const [nameError, setNameError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [repeatedPasswordError, setRepeatedPasswordError] = React.useState('');
  const [errors, setErrors] = React.useState(createRoomValidations(password, repeatedPassword, name));

  const onChange = (name: string, password: string, repeatedPassword: string) => {
    setName(name);
    setPassword(password);
    setRepeatedPassword(repeatedPassword);
    setErrors(createRoomValidations(password, repeatedPassword, name,));
    console.log(errors);
  };

  React.useEffect(() => {
    if (errors.name.length === 0) setNameError('');
    if (errors.password.length === 0) setPasswordError('');
    if (errors.repeatedPassword.length === 0) setRepeatedPasswordError('');
  }, [name, password, repeatedPassword]);

  const { createRoom } = React.useContext(Context);

  const handleCreateRoom = () => {

    if (errors.name.length === 0 &&
      errors.password.length === 0 &&
      repeatedPasswordError.length === 0 &&
      name.length > 0 && password.length > 0 &&
      repeatedPassword.length > 0
    ) {
      setCreateDisabled(true);
      createRoom(name, password)
        .then((result) => {
          console.log(result);
          setName('');
          setPassword('');
          setRepeatedPassword('');
          setCreateDisabled(false);
          navigation.navigate('Home');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setNameError(errors.name);
      setPasswordError(errors.password);
      setRepeatedPasswordError(errors.repeatedPassword);
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
            onPress={Keyboard.dismiss}>
            <View style={style.formContainer}>
              <View
                style={style.loginTextContainer}
              >
                <Text style={style.loginText}>Create room</Text>
              </View>
              <View>
                <Text style={style.textLabel}>Enter room name:</Text>
                <TextInput
                  style={style.textInput}
                  placeholder="Quantum mechanics"
                  placeholderTextColor="#9a9b9c"
                  onChangeText={name => onChange(name, password, repeatedPassword)}
                  defaultValue={name}
                  value={name}
                  keyboardType='email-address'
                />
                {nameError.length > 0 &&
                  <Text style={{ color: 'red' }}>{nameError}</Text>
                }
                <Text style={style.textLabel}>Enter room password:</Text>
                <TextInput
                  style={style.textInput}
                  placeholder="******"
                  placeholderTextColor="#9a9b9c"
                  onChangeText={password => onChange(name, password, repeatedPassword)}
                  defaultValue={password}
                  value={password}
                  secureTextEntry
                />
                {passwordError.length > 0 &&
                  <Text style={{ color: 'red' }}>{passwordError}</Text>
                }
                <Text style={style.textLabel}>Repeat room password:</Text>
                <TextInput
                  style={style.textInput}
                  placeholder="******"
                  placeholderTextColor="#9a9b9c"
                  onChangeText={repeatedPassword => onChange(name, password, repeatedPassword)}
                  defaultValue={repeatedPassword}
                  value={repeatedPassword}
                  secureTextEntry
                />
                {repeatedPasswordError.length > 0 &&
                  <Text style={{ color: 'red' }}>{repeatedPasswordError}</Text>
                }
                <Pressable
                  style={{
                    backgroundColor: principalColor,
                    borderRadius: 20,
                    height: 55,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: createDisabled ? 0.5 : 1,
                    marginTop: 50,
                  }}
                  onPress={handleCreateRoom}
                >
                  <Text
                    style={style.textButton}
                  >
                    Create room
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

export default CreateRoomScreen;