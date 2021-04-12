import React, {useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

interface User {
  name: string;
  email: string;
  age: number;
  birthDate?: string;
}

const App = (): JSX.Element => {
  const [state, setState] = useState<User | null>(null);
  const handlePress = (): string => {
    console.log(state);
    setState(null);
    return 'here';
  };

  return (
    <View style={styles.root}>
      <View>
        <Text style={styles.text}>Hello</Text>
        <Button title="Press" onPress={handlePress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#000000',
  },
  text: {
    color: '#FFFFFF',
  },
});

export default App;
