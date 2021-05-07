import * as React from 'react';
import { Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Context } from '../context/MainContext';

import style from '../styles/screens/login';

const CreateRoomScreen = ({ navigation }: any) => {

  const [ name, setName ] = React.useState('');
  const [ password, setPassword ] = React.useState('');
  const [ passwordValidation, setPasswordValidation ] = React.useState('');

  const { createRoom } = React.useContext( Context );

  const handleCreateRoom = () => {
    createRoom(name, password)
    navigation.navigate('Home');
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
                  onChangeText={name => setName(name)}
                  defaultValue={name}
                  value={name}
                  keyboardType='email-address'
                />
                <Text style={style.textLabel}>Enter room password:</Text>
                <TextInput
                  style={style.textInput}
                  placeholder="******"
                  placeholderTextColor="#9a9b9c"
                  onChangeText={password => setPassword(password)}
                  defaultValue={password}
                  value={password}
                  secureTextEntry
                />
                <Text style={style.textLabel}>Repeat room password:</Text>
                <TextInput
                  style={style.textInput}
                  placeholder="******"
                  placeholderTextColor="#9a9b9c"
                  onChangeText={passwordValidation => setPasswordValidation(passwordValidation)}
                  defaultValue={passwordValidation}
                  value={passwordValidation}
                  secureTextEntry
                />
                <TouchableOpacity
                  style={style.loginButton}
                  onPress={handleCreateRoom}
                >
                  <Text
                    style={style.textButton}
                  >
                    Create room
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

export default CreateRoomScreen;