import * as React from 'react';
import { Dimensions, Keyboard, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { principalColor } from '../config/colors';
import { Context } from '../context/MainContext';

import { createRoomValidations } from '../validations/createRoom';

const windowWidth = Dimensions.get('window').width;

const CreateRoomScreen = ({ navigation }: any) => {

  const { createRoom } = React.useContext(Context);

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
  };

  React.useEffect(() => {
    if (errors.name.length === 0) setNameError('');
    if (errors.password.length === 0) setPasswordError('');
    if (errors.repeatedPassword.length === 0) setRepeatedPasswordError('');
  }, [name, password, repeatedPassword]);

  const handleCreateRoom = () => {
    if (errors.name.length === 0 &&
      errors.password.length === 0 &&
      repeatedPasswordError.length === 0 &&
      name.length > 0 && password.length > 0 &&
      repeatedPassword.length > 0
    ) {
      setCreateDisabled(true);
      createRoom(name, password)
        .then(() => {
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

  const ref_input2 = React.useRef();
  const ref_input3 = React.useRef();

  return (
    <View style={{
      flex: 1,
      backgroundColor: 'white',
    }}>
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: 'white' }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={Keyboard.dismiss}>
            <View style={{
                  flex: 1,
                  flexDirection: 'column',
                  alignItems: 'center',
            }}>
              <View
                style={{
                  minWidth: '80%',
                }}
              >
                <Text style={{
                      color: '#69C1AC',
                      fontSize: 30,
                      alignSelf: 'center',
                      fontWeight: 'bold',
                      marginBottom: 15,
                }}>Create room</Text>
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
                  autoCorrect={false}
                  returnKeyType = {"next"}
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
                  returnKeyType = {"next"}
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
                  blurOnSubmit={false}
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
                    marginTop: 20,
                  }}
                  onPress={handleCreateRoom}
                >
                  <Text
                    style={{
                      fontSize: 28,
                      fontWeight: 'bold',
                      color: 'white'
                    }}
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

const style = StyleSheet.create({
  textInput: {
    fontSize: 18,
    width: windowWidth * 0.9,
    color: 'black',
    backgroundColor: '#E8E8E8',
    padding: 15,
    borderRadius: 10,
    minWidth: '80%',
  },
  textLabel: {
    marginTop: 5,
    marginBottom: 2,
    fontSize: 15,
    opacity: 0.6,
  },
});

export default CreateRoomScreen;