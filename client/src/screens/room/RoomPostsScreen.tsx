import React, { useContext, useEffect, useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Modal, Pressable, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
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
  authorProfilePicture: string;
  authorName: string;
  id: string;
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RoomPostsScreen = () => {

  const [ activeForm, setActiveForm ] = useState(false);
  const [ bodyPost, setBodyPost ] = useState('');
  const [ modalPictureVisible, setModalPictureVisible ] = useState(false);
  const [ activeSelectedPostOptions, setActiveSelectedPostOptions] = useState<SelectedPost>({ id: '',  body: '', image: '', authorProfilePicture: '', authorName: '' });
  const [ modalPostOptionVisible, setModalPostOptionVisible ] = useState(false);
  const [ imageUri, setImageUri ] = useState<undefined | ImagePickerResponse>();
  const [ selectedImagePostUrl, setSelectedImagePostUrl ] = useState('');

  const { selectedRoom, user, addNewPost, selectedRoomPosts, deletePost } = useContext( Context );

  const userIsOwner = selectedRoom?.owners.includes(user!.id);

  useEffect(() => {}, [selectedRoomPosts]);

  const handlePostOption = (post: SelectedPost) => {
    setModalPostOptionVisible(true)
    setActiveSelectedPostOptions(post);
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
              <View style={style.authorNameContainer}><Text style={style.authorNameText}>{item.authorName}</Text></View>
            </View>
            { user?.id === item.authorId &&
              <Icon
                name='more-vert'
                size={25}
                onPress={() => {
                  handlePostOption({id: item.id, 
                                    body: item.body,
                                    image: item.image.url,
                                    authorProfilePicture: item.authorProfilePicture, 
                                    authorName: item.authorName })}}
              />
            }
          </View>
          <View style={style.textContainer}>
            <Text style={style.text}>{item.body.trim()}</Text>
          </View>
          <View
            style={{
              alignItems: 'center', 
              marginBottom: 5, 
              backgroundColor: '#f1f1f1',
            }}

          >
            { item.image &&
            <Pressable
              onPress={() => {
                setSelectedImagePostUrl(item.image.url);
              }}
            >
              <Image
                source={{
                  uri: item.image.url,
                }}
                style={style.image}
                width={350}
                height={350}
              />
            </Pressable>
            }
          </View>
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
    setActiveForm(false);
  }

  const handleDeletePost = () => {
    if (! selectedRoom?.id ) return console.log('roomId is missing');
    deletePost(selectedRoom.id, activeSelectedPostOptions.id);
    setModalPostOptionVisible(false);
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
                <View style={{width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 10,}}>
                  {
                    imageUri &&
                    <Image 
                      style={{ width: 100, height: 100, borderRadius: 5, }}
                      source={{
                        uri: imageUri.uri
                      }}
                      width={100}
                      height={100}
                    />
                  }
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
                    onPress={() => {
                      setActiveForm(false)
                      setImageUri(undefined);
                      setBodyPost('');
                    }}
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
          <View
            style={{ flex: 1, backgroundColor: 'black', opacity: 0.5 , position: 'absolute', width: windowWidth, height: windowHeight }}
          >
          </View>
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
                style={modalStyles.button}
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
          <View
            style={{ flex: 1, backgroundColor: 'black', opacity: 0.5 , position: 'absolute', width: windowWidth, height: windowHeight }}
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
                    <Text style={{fontSize: 15, fontWeight: 'bold', opacity: 0.7, marginLeft: 10, }}>{activeSelectedPostOptions.authorName}</Text>
                  </View>
                  <Text style={{ fontSize: 15, color: 'black', margin: 10, opacity: 0.8 }}>
                    {`${activeSelectedPostOptions.body.slice(0, 100)}${activeSelectedPostOptions.body.length > 99 ? '...' : ''}`}
                  </Text>
                  {activeSelectedPostOptions.image  &&
                  <View style={{alignItems: 'center' }}>
                      <Image 
                        style={{ width: '100%', height: 100, borderRadius: 5, }}
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
              <Pressable
                style={modalStyles.button}
                onPress={handleDeletePost}
              >
                <Text style={modalStyles.textStyle}>Delete post</Text>
              </Pressable>
              <Pressable
                style={modalStyles.button}
                onPress={() => setModalPostOptionVisible(!modalPostOptionVisible)}
              >
                <Text style={modalStyles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Post Image modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={selectedImagePostUrl.length > 0}
          onRequestClose={() => {
            setSelectedImagePostUrl('')
          }}
        >
          <View
            style={{ flex: 1, backgroundColor: 'black', opacity: 0.5 , position: 'absolute', width: windowWidth, height: windowHeight }}
          >
          <Pressable
            onPress={() => console.log('here')}
          >
          </Pressable>
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
    </SafeAreaView>
  );
};

export default RoomPostsScreen;