import React from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { principalColor } from '../../config/colors';
import Background from '../Background';
import styles from '../../styles/modals/postModalOption';
import roomStyles from '../../styles/screens/room/roomPostScreen'
import { style as modalStyles } from '../../styles/modals/modal';

const PostOptionModal = ({ modalPostOptionVisible, setModalPostOptionVisible, activeSelectedPostOptions, handleDeletePost }: any) => {
  if ( ! activeSelectedPostOptions ) return null;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalPostOptionVisible}
      onRequestClose={() => {
        setModalPostOptionVisible(!modalPostOptionVisible);
      }}
    >
      <Background />
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <View style={styles.pictureContainer}>

                {
                  activeSelectedPostOptions.authorProfilePicture ?
                    <Image
                      source={{
                        uri: activeSelectedPostOptions.authorProfilePicture
                      }}
                      style={roomStyles.authorProfileImage}
                    />
                    :
                    <Icon
                      style={roomStyles.authorProfileImage}
                      name="account-circle"
                      size={38}
                      color={principalColor}
                    />
                }
                <Text style={styles.authorNameText}>{activeSelectedPostOptions.authorName}</Text>
              </View>
              <Text style={styles.bodyText}>
                {`${activeSelectedPostOptions.body.slice(0, 100)}${activeSelectedPostOptions.body.length > 99 ? '...' : ''}`}
              </Text>
              {activeSelectedPostOptions.image &&
                <View style={{ alignItems: 'center' }}>
                  <Image
                    style={styles.image}
                    source={{ uri: activeSelectedPostOptions.image }}
                    width={250}
                    height={150}
                  />
                </View>
              }
            </View>
          </View>
          <TouchableOpacity style={modalStyles.button} onPress={ handleDeletePost }>
            <Text style={modalStyles.textStyle}>Delete post</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={modalStyles.button}
            onPress={() => setModalPostOptionVisible( ! modalPostOptionVisible )}
          >
            <Text style={modalStyles.textStyle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PostOptionModal;
