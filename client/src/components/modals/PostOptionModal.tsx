import React from 'react';
import { Dimensions, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { principalColor } from '../../config/colors';
import { style as modalStyles } from '../../styles/components/modal';
import styles from '../../styles/screens/roomPostScreen'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PostOptionModal = ({modalPostOptionVisible, setModalPostOptionVisible, activeSelectedPostOptions, handleDeletePost }: any) => {
  if (!activeSelectedPostOptions) return null;
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
            {
              activeSelectedPostOptions.authorProfilePicture ?
                <Image
                  source={{
                    uri: activeSelectedPostOptions.authorProfilePicture
                  }}
                  style={styles.authorProfileImage}
                />
                :
                <Icon
                  style={styles.authorProfileImage}
                  name="account-circle"
                  size={38}
                  color={principalColor}
                />
            }
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