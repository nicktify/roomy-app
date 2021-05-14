import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const SocialMediaIcon = ({name, size}: {name: string, size: number}) => {
  return (
    <Icon 
      style={{marginBottom: 20}}
      name={name}
      size={size ? size : 30}
    />
  );
};

export default SocialMediaIcon;