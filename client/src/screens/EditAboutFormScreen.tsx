import React, { useContext, useEffect, useState } from 'react';
import { Text, TextInput, View, Dimensions, TouchableOpacity, Keyboard } from 'react-native';
import { principalColor } from '../config/colors';
import { Context } from '../context/MainContext';

const windowWidth = Dimensions.get('window').width;

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
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}
    >
      <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', opacity: 0.8 }}>Edit about</Text>
      </View>
      <TextInput
        style={{
          width: windowWidth * 0.9,
          borderRadius: 5,
          borderColor: '#4a4a4a',
          borderWidth: 0.2,
          fontSize: 18,
          paddingHorizontal: 20,
          marginTop: 40,
          color: '#4a4a4a',
        }}
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
        style={{
          alignItems: 'center',
          marginTop: 20,
          backgroundColor: principalColor,
          borderRadius: 20,
          padding: 10,
          justifyContent: 'center',
          width: windowWidth * 0.5,
          alignSelf: 'center',
          opacity: saveAboutDisabled ? 0.5 : 1,
        }}
        onPress={() => handleChangeAbout()}
      >
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Change about</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditAboutFormScreen;