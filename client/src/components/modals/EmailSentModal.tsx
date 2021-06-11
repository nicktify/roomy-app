import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import TransparentBackground from '../TransparentBackground';
import styles from '../../styles/modals/emailSentModal';

const EmailSentModal = ({ showEmailSentModal, setShowEmailSentModal }: any) => {
  return (
    <Modal
      visible={showEmailSentModal}
      transparent
      onRequestClose={() => setShowEmailSentModal(false)}
    >
      <TransparentBackground />
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.emailSentText}>
            Email sent. Please check your inbox.
          </Text>
          <Pressable
            style={styles.okButton}
            onPress={() => setShowEmailSentModal(!showEmailSentModal)}
          >
            <Text style={styles.okButtonText}>
              OK
            </Text>
          </Pressable>
        </View>
      </View>
  </Modal>
  );
};

export default EmailSentModal;