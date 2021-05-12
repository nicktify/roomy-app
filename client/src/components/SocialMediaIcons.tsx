import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SocialMediaIcons = ({ handleSocialMediaPress }: any) => {



  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center'
      }}
    >
      <Icon
        style={{margin: 20}}
        name='facebook'
        color='black'
        size={20}
        onPress={() => handleSocialMediaPress('facebook')}
      />
      <Icon
        style={{margin: 20}}
        name='instagram'
        color='black'
        size={20}
        onPress={() => handleSocialMediaPress('instagram')}
      />
      <Icon
        style={{margin: 20}}
        name='twitter'
        color='black'
        size={20}
        onPress={() => handleSocialMediaPress('twitter')}
      />
    </View>
  );
};

export default SocialMediaIcons;