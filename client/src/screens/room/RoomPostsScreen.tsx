import React, { useContext, useEffect, useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Modal, Pressable, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from "react-native-vector-icons/MaterialIcons";

import { Context } from '../../context/MainContext';

import style from '../../styles/screens/roomPostScreen';

import { style as modalStyles } from '../../styles/components/modal'
import { principalColor } from '../../config/colors';
import { Post } from '../../types/Post';

class SelectedPost {
  body: string;
  image: string;
}

const RoomPostsScreen = () => {

  const [ activeForm, setActiveForm ] = useState(false);
  const [ bodyPost, setBodyPost ] = useState('');
  const [ modalPictureVisible, setModalPictureVisible ] = useState(false);
  const [ activeSelectedPostOptions, setActiveSelectedPostOptions] = useState<SelectedPost>({body: '', image: ''});
  const [ modalPostOptionVisible, setModalPostOptionVisible ] = useState(false);
  const [ imageUri, setImageUri ] = useState<undefined | ImagePickerResponse>();

  const { selectedRoom, user, addNewPost, selectedRoomPosts } = useContext( Context );

  const userIsOwner = selectedRoom?.owners.includes(user!.id);

  useEffect(() => {}, [selectedRoomPosts]);

  const handlePostOption = (body: string, image: string) => {
    setModalPostOptionVisible(true)
    setActiveSelectedPostOptions({body, image});
  }

  
  const renderItem = ({ item }: {item: Post}) => (
    <View
      style={style.postContainer}
    >
      <View
        style={style.postInnerContainer}
      >
        <View style={style.postTopContainer}>
          <View style={style.authorInfoContainer}>
            {item.authorProfilePicture.length > 10 ?
              <Image
                source={{
                  uri: item.authorProfilePicture
                }}
                style={style.authorProfileImage}
              />
              :
              <Icon
                style={style.authorProfileImage}
                name="account-circle"
                size={80}
                color={principalColor}
                onPress={() => setModalPictureVisible(true)}
              />
            }
            <View style={style.authorNameContainer}><Text style={style.authorName}>{item.authorName}</Text></View>
          </View>
          <Icon
            name='more-vert'
            size={25}
            onPress={() => handlePostOption(item.body, item.image)}
          />
        </View>
        <View style={style.textContainer}>
          <Text style={style.text}>{item.body}</Text>
        </View>
        { item.image &&
          <Image
            source={{
              uri: item.image,
            }}
            style={style.image}
            height={300}
            width={350}
          />
        }
      </View>
    </View>
  )

  const handleUploadImage = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5
    }, (resp: ImagePickerResponse) => {
      setModalPictureVisible(false);
      if (resp.didCancel) return;
      if (!resp.uri) return;
      setImageUri(resp);
    });
  };

  const handleTakePicture = () => {
    launchCamera({
      mediaType: 'photo',
      quality: 0.5
    }, (resp: ImagePickerResponse) => {
      setModalPictureVisible(false);
      if (resp.didCancel) return;
      if (!resp.uri) return;
      setImageUri(resp)
    });
  }

  const handlePublish = () => {
    addNewPost(bodyPost, imageUri ? imageUri : undefined);
  }

  return (
    <SafeAreaView style={style.root}>
          <FlatList
            data={selectedRoomPosts}
            renderItem={renderItem}
            keyExtractor={item => `${item.body}${item.date}`}
            ListFooterComponent={<View style={{width: '100%', height: 60}}></View>}
            ListHeaderComponent={<View style={{width: '100%', height: 20}}></View>}
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
                <KeyboardAwareScrollView style={{flex: 1, width: '100%', height: '100%'}}>
                  <View style={{ width: '100%', alignItems: 'center', marginTop: 20}}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' , opacity: 0.8 }}>Add new post</Text>
                  </View>
                <TextInput
                  multiline
                  placeholder="What's new?"
                  autoCorrect={false}
                  style={style.textInput}
                  onChangeText={bodyPost => setBodyPost(bodyPost)}
                  defaultValue={bodyPost}
                  value={bodyPost}
                />
                <View style={{width: '100%', alignItems: 'center'}}>
                  <TouchableOpacity
                    style={style.uploadImageButton}
                    onPress={() => setModalPictureVisible(true)}
                  >
                    <Text style={style.uploadImageButtonText}>Upload image</Text>
                  </TouchableOpacity>

                </View>
                <View style={style.buttonsFormContainer}>
                  <TouchableOpacity
                    style={style.publishFormButton}
                    onPress={handlePublish}
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
            </KeyboardAwareScrollView>
              </View>

      }
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalPictureVisible}
          onRequestClose={() => {
            setModalPictureVisible(!modalPictureVisible);
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
                onPress={() => setModalPictureVisible(!modalPictureVisible)}
              >
                <Text style={modalStyles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalPostOptionVisible}
          onRequestClose={() => {
            setModalPictureVisible(!modalPictureVisible);
          }}
        >
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  alignItems: 'center',
                  borderRadius: 5,
                }}
              >
                <Text style={{ fontSize: 18, color: 'black', marginBottom: 10, }}>
                  {`${activeSelectedPostOptions.body.slice(0, 100)}${activeSelectedPostOptions.body.length > 99 ? '...' : ''}`}
                </Text>
                {activeSelectedPostOptions.image  &&
                  <Image 
                    style={{ width: 100, height: 100, borderRadius: 5, }}
                    source={{
                      uri: activeSelectedPostOptions.image
                    }}
                    width={100}
                    height={100}
                />
                }
              </View>
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
                onPress={() => setModalPostOptionVisible(!modalPostOptionVisible)}
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