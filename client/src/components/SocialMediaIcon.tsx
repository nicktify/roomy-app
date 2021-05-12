import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const SocialMediaIcon = ({name}: {name: string}) => {
  return (
    <Icon 
      style={{marginBottom: 20}}
      name={name}
      size={30}
    />
  );
};

export default SocialMediaIcon;