import React, { useContext, useState } from 'react';
import { Dimensions, Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { principalColor } from '../config/colors';
import { Context } from '../context/MainContext';
import SelectImageOnPostFormModal from '../components/modals/SelectImageOnPostFormModal';

const windowWidth = Dimensions.get('window').width;

const NewPostForm = ({navigation}: any) => {

  const { addNewPost } = useContext(Context);

  const [bodyPost, setBodyPost] = useState('');
  const [bodyPostFormError, setBodyPostFormError] = useState('');
  const [disabledPublishPostButton, setDisabledPublishPostButton] = useState(false);
  const [imageUri, setImageUri] = useState<undefined | ImagePickerResponse>();
  const [modalPictureVisible, setModalPictureVisible] = useState(false);

  const handlePublish = () => {
    if (bodyPost.length > 0 && !disabledPublishPostButton) {
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
     flex: 1,
      backgroundColor: 'white',
      alignItems: 'center'
    }}>
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <Text style={{
          color: '#69C1AC',
          fontSize: 30,
          alignSelf: 'center',
          fontWeight: 'bold',
          marginBottom: 15,
        }}>
          Create new post
        </Text>
        <View
          style={{
            width: windowWidth * 0.9,
            alignSelf: 'center'
          }}
        >
          <TextInput
            style={{
              fontSize: 18,
              width: windowWidth * 0.9,
              color: 'black',
              backgroundColor: '#E8E8E8',
              padding: 15,
              borderRadius: 10,
            }}
            placeholder='What do you want to share?'
            placeholderTextColor="#9a9b9c"
            autoCorrect={false}
            autoFocus
            multiline
            onChangeText={bodyPost => setBodyPost(bodyPost)}
            defaultValue={bodyPost}
            value={bodyPost}
          />
          {
            bodyPostFormError.length > 0 &&
            <Text style={{ color: 'red' }}>{bodyPostFormError}</Text>
          }
        </View>
        <View style={{ width: windowWidth, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingVertical: 20 }}>
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
              marginLeft: 10,
              borderRadius: 2,
              borderColor: '#4a4a4a',
              borderWidth: 0.1,
              padding: 15,
              alignItems: 'center',
            }}
            onPress={() => setModalPictureVisible(true)}
          >
            <Text style={{
              color: 'black',
              fontSize: 15,
              opacity: 0.7,
            }}>
              {imageUri ? 'Upload another image' : 'Upload image'}
            </Text>
          </TouchableOpacity>
        </View>
          <Pressable
            style={{
              alignItems: 'center',
              backgroundColor: principalColor,
              borderRadius: 20,
              padding: 10,
              justifyContent: 'center',
              marginTop: 18,
              width: windowWidth * 0.5,
              alignSelf: 'center',
              opacity: disabledPublishPostButton ? 0.5 : 1
            }}
            onPress={handlePublish}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 25,
                fontWeight: 'bold',
              }}
            >Publish</Text>
          </Pressable>
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