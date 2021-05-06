import React from 'react';
import { Text, View } from 'react-native';

import styles from '../../styles/components/room';

const Room = ( { name }: { name: string } ) => {
  return (
    <>
      <View style={styles.roomContainer}>
        <Text style={styles.roomName}>{ name }</Text>
      </View>
    </>
  );
};

export default Room;