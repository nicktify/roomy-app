import React, { useContext, useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Context } from '../context/MainContext';
import styles from '../styles/screens/addNewForumPostComment';

const AddNewForumPostCommentScreen = ({ navigation, route }: any) => {

  const { id, image, authorName, authorProfilePicture, body  } = route.params;

  const { addForumPostComment } = useContext(Context);

  const [bodyInput, setBodyInput] = useState('');
  const [createDisabled, setCreateDisabled] = useState(false);
  const [nameError, setNameError] = useState('');

  const handleCreateNewComment = () => {
    if (body.length > 0) {
      setCreateDisabled(true);
      addForumPostComment(id, bodyInput)
        .then(() => {
          setBodyInput('');
          setCreateDisabled(false);
          setNameError('')
          navigation.navigate('Room');
        })
        .catch(error => {
          setCreateDisabled(false);
          console.log(error);
        });
    } else {
      setNameError('This should not be empty');
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={styles.keyboardScrollView}>
        <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
          <TouchableWithoutFeedback style={styles.touchableWithoutFeedback} onPress={Keyboard.dismiss}>
            <View style={styles.innerContainer}>
              <View style={styles.commentTextContainer}>
                <Text style={styles.addNewCommentText}>
                  Add new comment
                </Text>
              </View>
              <View style={styles.postPreviewContainer}>
                <View style={styles.authorContainer}>
                  <Image style={styles.authorProfilePicture} source={{ uri: authorProfilePicture }} />
                  <Text>
                    {authorName}
                  </Text>
                </View>
                <View style={styles.postContainer}>
                  {
                    image && 
                    <Image
                      style={styles.postImage}
                      source={{ uri: image }}
                    />
                  }
                  <Text style={styles.bodyText}>
                    {body}
                  </Text>
                </View>
              </View>
              <View>
                <TextInput
                  style={styles.textInput}
                  placeholder="I think it's a great idea."
                  placeholderTextColor="#9a9b9c"
                  onChangeText={bodyInput => setBodyInput(bodyInput)}
                  defaultValue={bodyInput}
                  value={bodyInput}
                  autoCorrect={false}
                  returnKeyType = {"next"}
                  autoFocus
                />
                {
                  nameError.length > 0 &&
                    <Text style={styles.nameErrorText}>{nameError}</Text>
                }
                <TouchableOpacity
                  style={[styles.handleCreateComment, {opacity: createDisabled ? 0.5 : 1 }]}
                  onPress={handleCreateNewComment}
                >
                  <Text style={styles.addComment}>
                    Add comment
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </KeyboardAwareScrollView>
    </View>
  );
};


export default AddNewForumPostCommentScreen;
