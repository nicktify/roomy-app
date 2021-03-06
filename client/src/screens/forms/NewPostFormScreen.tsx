import React, { useContext, useState } from 'react';
import { Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Context } from '../../context/MainContext';
import SelectImageOnPostFormModal from '../../components/modals/SelectImageOnPostFormModal';
import styles from '../../styles/screens/newPostFormScreen';

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
    <View style={styles.container}>
      <KeyboardAwareScrollView style={styles.awareScrollView}>
        <Text style={styles.cratePostText}>
          Create new post
        </Text>
        <View
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.textInput}
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
        <View style={styles.imageFormContainer}>
          {
            imageUri &&
            <Image
              style={styles.imagePreview}
              source={{ uri: imageUri.uri }}
              width={100}
              height={100}
            />
          }
          <TouchableOpacity style={styles.uploadImageButton} onPress={() => setModalPictureVisible(true)}>
            <Text style={styles.uploadImageText}>
              {imageUri ? 'Upload another image' : 'Upload image'}
            </Text>
          </TouchableOpacity>
        </View>
          <Pressable
            style={[styles.publishButton, { opacity: disabledPublishPostButton ? 0.5 : 1 }]}
            onPress={handlePublish}
          >
            <Text style={styles.publishButtonText}>Publish</Text>
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