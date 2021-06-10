import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import Background from '../Background';
import styles from '../../styles/modals/showSocialMediaPreview';

const ShowSocialMediaPreviewLinkModal = ({ showPreviewSocialMediaLink, setShowPreviewSocialMediaLink, selectedSocialMediaLink }: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showPreviewSocialMediaLink}
      onRequestClose={() => {
        setShowPreviewSocialMediaLink(false);
      }}
    >
      <Background />
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View
            style={styles.textContainer}
          >
            <Text style={styles.text}>{selectedSocialMediaLink}</Text>
          </View>
          <TouchableOpacity style={styles.touchableOpacity}>
            <Text>Copy to clipboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ShowSocialMediaPreviewLinkModal;