import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { principalColor } from '../../config/colors';

import styles from '../../styles/components/selectRooms';

const SelectRooms = ({ selectedRooms, setSelectedRooms }: any) => {
  return (
    <>
      <View
        style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 30 }}
      >
        <TouchableOpacity
          style={[styles.root, { backgroundColor: selectedRooms === 'createdRooms' ? '#bacfca' : principalColor }]}
          disabled={ selectedRooms === 'createdRooms' }
          onPress={ () => setSelectedRooms('createdRooms') }
        >
          <Text style={styles.text}>Created rooms</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.root, { backgroundColor: selectedRooms === 'invitedRooms' ? '#bacfca' : principalColor }]}
          disabled={ selectedRooms == 'invitedRooms' ? true : false }
          onPress={ () => setSelectedRooms('invitedRooms') }
        >
          <Text style={styles.text}>Invited rooms</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SelectRooms;