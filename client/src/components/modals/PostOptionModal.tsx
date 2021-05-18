import React from 'react';
import { Dimensions, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { style as modalStyles } from '../../styles/components/modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PostOptionModal = ({modalPostOptionVisible, setModalPostOptionVisible, activeSelectedPostOptions, handleDeletePost }: any) => {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalPostOptionVisible}
    onRequestClose={() => {
      setModalPostOptionVisible(!modalPostOptionVisible);
    }}
  >
    <View
      style={{ flex: 1, backgroundColor: 'black', opacity: 0.5, position: 'absolute', width: windowWidth, height: windowHeight }}
    >
    </View>
    <View style={modalStyles.centeredView}>
      <View style={modalStyles.modalView}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 10,
            alignItems: 'center',
            borderRadius: 5,
          }}
        >
          <View
            style={{
              width: 280,
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              elevation: 4,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                }}
                source={{
                  uri: activeSelectedPostOptions.authorProfilePicture
                }}
                width={40}
                height={40}
              />
              <Text style={{ fontSize: 15, fontWeight: 'bold', opacity: 0.7, marginLeft: 10, }}>{activeSelectedPostOptions.authorName}</Text>
            </View>
            <Text style={{ fontSize: 15, color: 'black', margin: 10, opacity: 0.8 }}>
              {`${activeSelectedPostOptions.body.slice(0, 100)}${activeSelectedPostOptions.body.length > 99 ? '...' : ''}`}
            </Text>
            {activeSelectedPostOptions.image &&
              <View style={{ alignItems: 'center' }}>
                <Image
                  style={{ 
                    width: '100%',
                    height: '100%'
                  }}
                  source={{
                    uri: activeSelectedPostOptions.image
                  }}
                  width={250}
                  height={150}
                />
              </View>
            }
          </View>
        </View>
        <TouchableOpacity
          style={modalStyles.button}
          onPress={handleDeletePost}
        >
          <Text style={modalStyles.textStyle}>Delete post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={modalStyles.button}
          onPress={() => setModalPostOptionVisible(!modalPostOptionVisible)}
        >
          <Text style={modalStyles.textStyle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  );
};

export default PostOptionModal;