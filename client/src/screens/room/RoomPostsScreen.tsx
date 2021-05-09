import React, { useContext, useState } from 'react';
import { Image, Modal, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from "react-native-vector-icons/MaterialIcons";

import { Context } from '../../context/MainContext';

import style from '../../styles/screens/roomPostScreen';

import { style as modalStyles } from '../../styles/components/modal'

const RoomPostsScreen = () => {

  const [ activeForm, setActiveForm ] = useState(false);
  const [ modalVisible, setModalVisible ] = useState(false);

  const { selectedRoom, user } = useContext( Context );

  const userIsOwner = selectedRoom?.owners.includes(user!.id);

  const sortedPosts = selectedRoom?.posts.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  })
  
  const renderItem = ({ item }: any) => (
    <View
      style={style.postContainer}
    >
      <View
        style={style.postInnerContainer}
      >
        <Image
          source={{
            uri: item.image,
          }}
          style={style.image}
          height={300}
          width={300}
        />
        <View style={style.textContainer}>
          <Text style={style.text}>{item.body}</Text>
        </View>
      </View>
    </View>
  )

  const handleUploadImage = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5
    }, (resp: ImagePickerResponse) => {

      if (resp.didCancel) return;
      if (!resp.uri) return;

    });
  };

  const handleTakePicture = () => {
    launchCamera({
      mediaType: 'photo',
      quality: 0.5
    }, (resp: ImagePickerResponse) => {

      if (resp.didCancel) return;
      if (!resp.uri) return;

    });
  }

  return (
    <SafeAreaView style={style.root}>
      <FlatList
        data={sortedPosts}
        renderItem={renderItem}
        keyExtractor={item => `${item.body}${item.date}`}
      />
      {
        userIsOwner &&
          <Icon
            style={style.addIcon}
            name="add"
            color='white'
            size={40}
            onPress={() => setActiveForm(true)}
          />
      }
      {
        activeForm &&
          <View style={style.form}>
            <TextInput
              multiline
              placeholder="what's new?"
              style={style.textInput}
            />
            <TouchableOpacity
                style={style.uploadImageButton}
                onPress={() => setModalVisible(true)}
              >
                <Text style={style.uploadImageButtonText}>Upload image</Text>
              </TouchableOpacity>
            <View style={style.buttonsFormContainer}>
              <TouchableOpacity
                style={style.publishFormButton}
                onPress={() => setActiveForm(false)}
              >
                <Text style={style.cancelFormText}>Publish</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={style.cancelFormButton}
                onPress={() => setActiveForm(false)}
              >
                <Text style={style.cancelFormText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>

      }
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <Pressable
                style={modalStyles.button}
                onPress={handleUploadImage}
              >
                <Text style={modalStyles.textStyle}>Select from galery</Text>
              </Pressable>
              <Pressable
                style={modalStyles.button}
                onPress={handleTakePicture}
              >
                <Text style={modalStyles.textStyle}>Take picture</Text>
              </Pressable>
              <Pressable
                style={modalStyles.buttonCancel}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={modalStyles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
    </SafeAreaView>
  );
};

export default RoomPostsScreen;