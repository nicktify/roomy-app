import * as React from 'react';
import { Dimensions, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { principalColor } from '../config/colors';
import { Context } from '../context/MainContext';

import { createRoomValidations } from '../validations/createRoom';

const windowWidth = Dimensions.get('window').width;

const CreateRoomScreen = ({ navigation }: any) => {

  const { createRoom } = React.useContext(Context);

  const [name, setName] = React.useState('');
  const [createDisabled, setCreateDisabled] = React.useState(false);
  const [nameError, setNameError] = React.useState('');
  const [errors, setErrors] = React.useState(createRoomValidations(name));

  const onChange = (name: string) => {
    setName(name);
    setErrors(createRoomValidations(name));
  };

  const handleCreateRoom = () => {
    if (errors.name.length === 0) {
      setCreateDisabled(true);
      createRoom(name)
        .then(() => {
          setName('');
          setCreateDisabled(false);
          setNameError('')
          navigation.navigate('Home');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setNameError(errors.name);
    }
  };

  return (
    <View 
      style={{
        flex: 1,
        backgroundColor: 'white',
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
                    fontSize: 30,
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    marginBottom: 15,
                  }}
                >
                  Create room
                </Text>
              </View>
              <View>
                <Text style={style.textLabel}>
                  Enter room name:
                </Text>
                <TextInput
                  style={style.textInput}
                  placeholder="Quantum mechanics"
                  placeholderTextColor="#9a9b9c"
                  onChangeText={name => onChange(name)}
                  defaultValue={name}
                  value={name}
                  autoCorrect={false}
                  returnKeyType = {"next"}
                  autoFocus
                />
                {
                  nameError.length > 0 &&
                    <Text style={{ color: 'red' }}>{nameError}</Text>
                }
                <TouchableOpacity
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
                </TouchableOpacity>
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