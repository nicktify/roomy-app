import * as React from 'react';
import { Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Context } from '../context/MainContext';
import { createRoomValidations } from '../validations/createRoom';
import styles from '../styles/screens/createRoomScreen';

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
    <View style={styles.container}>
      <KeyboardAwareScrollView style={styles.awareScrollView}>
        <KeyboardAvoidingView style={styles.avoidingView}>
          <TouchableWithoutFeedback style={styles.keyboardDismiss} onPress={Keyboard.dismiss}>
            <View  style={styles.innerContainer}>
              <View
                style={styles.titleContainer}
              >
                <Text style={styles.title}>
                  Create room
                </Text>
              </View>
              <View>
                <Text style={styles.textLabel}>
                  Enter room name:
                </Text>
                <TextInput
                  style={styles.textInput}
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
                  style={[styles.createRoomButton, { opacity: createDisabled ? 0.5 : 1, }]}
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

export default CreateRoomScreen;