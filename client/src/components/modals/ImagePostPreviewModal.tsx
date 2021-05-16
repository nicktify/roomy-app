import React from 'react';
import { Dimensions, Image, Modal, View } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ImagePostPreviewModal = ({selectedImagePostUrl, setSelectedImagePostUrl, }: any) => {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={selectedImagePostUrl.length > 0}
    onRequestClose={() => {
      setSelectedImagePostUrl('');
    }}
  >
    <View
      style={{ flex: 1, backgroundColor: 'black', opacity: 0.5, position: 'absolute', width: windowWidth, height: windowHeight }}
    >
    </View>
    <View style={{
      flex: 1,
      width: windowWidth,
      height: windowHeight,
      position: 'absolute',
      justifyContent: 'center'
    }}>
      <Image
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute'
        }}
        source={{
          uri: selectedImagePostUrl
        }}
        width={windowWidth}
        height={windowWidth}
      />
    </View>
  </Modal>
  );
};

export default ImagePostPreviewModal;