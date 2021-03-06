import React, { useContext, useEffect, useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, Keyboard } from 'react-native';
import { Context } from '../../context/MainContext';
import styles from '../../styles/screens/editAboutForm';

const EditAboutFormScreen = ({navigation}: any) => {

  const { changeAbout, user } = useContext(Context);

  const [about, setAbout] = useState('');
  const [saveAboutDisabled, setSaveAboutDisabled] = useState(false);

  useEffect(() => {
    if (user && user.about.length > 0) setAbout(user.about)
  }, [])

  useEffect(() => {
    const action = () => {
      navigation.navigate('Profile');
    }
    Keyboard.addListener('keyboardDidHide', action);
    return () => Keyboard.removeListener('keyboardDidHide', action);
  }, [])

  const handleChangeAbout = () => {
    if (about.length > 0 && user && user.about.length !== about.length) {
      setSaveAboutDisabled(true);
      changeAbout(about)
        .then(() => {
          navigation.navigate('Profile');
        })
        .catch(error => {
          console.log(error);
          setSaveAboutDisabled(false);
        });
    } else {
      navigation.navigate('Profile');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
          <Text style={styles.title}>Edit about</Text>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder='What best describes you?'
        placeholderTextColor='#4a4a4a'
        maxLength={500}
        autoFocus
        onChangeText={(about) => setAbout(about)}
        value={about}
        defaultValue={about}
        onSubmitEditing={() => handleChangeAbout()}
      />
      <TouchableOpacity
        style={[styles.changeAboutButton, { opacity: saveAboutDisabled ? 0.5 : 1 }]}
        onPress={() => handleChangeAbout()}
      >
        <Text style={styles.changeAboutButtonText}>Change about</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditAboutFormScreen;