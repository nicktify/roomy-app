import React, { useContext, useState } from 'react';
import { Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { principalColor } from '../config/colors';
import { Context } from '../context/MainContext';
import SelectImageOnPostFormModal from '../components/modals/SelectImageOnPostFormModal';

const NewPostForm = ({navigation}: any) => {

  const { addNewPost } = useContext(Context);

  const [bodyPost, setBodyPost] = useState('');
  const [bodyPostFormError, setBodyPostFormError] = useState('');
  const [disabledPublishPostButton, setDisabledPublishPostButton] = useState(false);
  const [imageUri, setImageUri] = useState<undefined | ImagePickerResponse>();
  const [modalPictureVisible, setModalPictureVisible] = useState(false);

  const handlePublish = () => {
    if (bodyPost.length > 1 && !disabledPublishPostButton) {
      setDisabledPublishPostButton(true);
      addNewPost(bodyPost, imageUri ? imageUri : undefined)
        .then(() => {
          navigation.navigate('Room')
        })
        .catch(error => {
          console.log(error);
          setBodyPostFormError('Something went bad. Please try again.');
        });
    } else {
      setBodyPostFormError('This should not be empty.');
    }
  };

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
      setImageUri(resp);
    });
  };

  return (
    <View style={{
      height: '100%',
      width: '100%',
      backgroundColor: 'white',
      paddingHorizontal: 20,
      alignItems: 'center'
    }}>
      <KeyboardAwareScrollView style={{ flex: 1, width: '100%', height: '100%' }}>
        <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', opacity: 0.8 }}>Add new post</Text>
        </View>
        <TextInput
          multiline
          placeholder="What's new?"
          autoCorrect={false}
          style={{
            color: 'black',
            fontSize: 18,
            marginTop: 20,
            borderRadius: 10,
            borderColor: '#f1f1f1',
            borderWidth: 2,
            width: '100%',
            opacity: 0.8,
          }}
          onChangeText={bodyPost => setBodyPost(bodyPost)}
          defaultValue={bodyPost}
          value={bodyPost}
        />
        {
          bodyPostFormError.length > 0 &&
          <Text style={{ color: 'red' }}>{bodyPostFormError}</Text>
        }
        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 10, }}>
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
            style={{
              borderRadius: 20,
              margin: 30,
              borderColor: '#f1f1f1',
              borderWidth: 2,
              padding: 10,
            }}
            onPress={() => setModalPictureVisible(true)}
          >
            <Text style={{
              color: 'black',
              fontSize: 20,
              opacity: 0.7,
            }}>Upload image</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10,
          width: '100%',
        }}>
          <Pressable
            style={{
              backgroundColor: principalColor,
              borderRadius: 30,
              width: 150,
              padding: 10,
              alignItems: 'center',
              opacity: disabledPublishPostButton ? 0.5 : 1,
            }}
            onPress={handlePublish}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                opacity: 0.8,
              }}
            >Publish</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>

      <SelectImageOnPostFormModal 
        modalPictureVisible={modalPictureVisible}
        setModalPictureVisible={setModalPictureVisible}
        handleUploadImage={handleUploadImage}
        handleTakePicture={handleTakePicture}
      />

    </View>
  );
};

export default NewPostForm;