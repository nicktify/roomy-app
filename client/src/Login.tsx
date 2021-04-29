import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const Login = () => {
  return (
    <>
      <View style={style.root}>
        <View style={style.formContainer}>
          <TextInput
            style={style.formInput}
            placeholder="Enter your email"
          />
          <TextInput
            style={style.formInput}
            placeholder="Enter your password"
          />
        </View>
      </View>
    </>
  );
};

export default Login;

const style = StyleSheet.create({
  root: {
    flex: 1
  },
  formContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formInput: {
    width: 200,
  }
});