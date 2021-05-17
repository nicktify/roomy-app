import React from 'react';
import { Dimensions, Modal, Text, TouchableOpacity, View } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ShowSocialMediaPreviewLinkmodal = ({ showPreviewSocialMediaLink, setShowPreviewSocialMediaLink, selectedSocialMediaLink }: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showPreviewSocialMediaLink}
      onRequestClose={() => {
        setShowPreviewSocialMediaLink(false);
      }}
    >
      <View
        style={{ flex: 1, backgroundColor: 'black', opacity: 0.5, position: 'absolute', width: windowWidth, height: windowHeight }}
      >
      </View>
      <View
        style={{ width: windowWidth, height: windowHeight, justifyContent: 'center', alignItems: 'center' }}
      >
        <View
          style={{
            backgroundColor: 'white',
            width: windowWidth * 0.8,
            height: windowHeight * 0.2,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50
          }}
        >
          <View
            style={{
              backgroundColor: '#f1f1f1f1',
              borderRadius: 20,
              borderColor: '#a4a4a4a4',
              borderWidth: 0.2,
              padding: 10,
            }}
          >
            <Text style={{ color: 'black' }}>{selectedSocialMediaLink}</Text>
          </View>
          <TouchableOpacity
            style={{
              borderWidth: 0.5,
              borderColor: '#a2a2a2a2',
              borderRadius: 30,
              padding: 10,
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>Copy to clipboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ShowSocialMediaPreviewLinkmodal;