import React from 'react';
import { Dimensions, Image, Modal, View } from 'react-native';
import { styles } from '../../styles/modals/imagePostPreviewModal';

const windowWidth = Dimensions.get('window').width;

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
    <View style={styles.transparentBackground}></View>
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
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