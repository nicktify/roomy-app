import React, { useContext, useState } from 'react';
import { Dimensions, Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { principalColor } from '../config/colors';
import { Context } from '../context/MainContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
    <View 
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: 'white' }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={Keyboard.dismiss}
          >
            <View 
              style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  minWidth: '80%',
                }}
              >
                <Text 
                  style={{
                    color: '#69C1AC',
                    fontSize: 30,
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    marginBottom: 15,
                  }}
                >
                  Add new comment
                </Text>
              </View>
              <View
                style={{
                  margin: 20,
                  width: windowWidth * 0.9,
                  backgroundColor: 'white',
                  borderRadius: 5,
                  padding: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 15,
                  }}
                >
                  <Image
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 50,
                      marginRight: 10,
                    }}
                    source={{
                      uri: authorProfilePicture,
                    }}
                  />
                  <Text>
                    {authorName}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  {
                    image && 
                    <Image
                      style={{
                        width: 80,
                        height: 80,
                        marginRight: 20,
                        borderRadius: 5,
                      }}
                      source={{
                        uri: image
                      }}
                    />
                  }
                  <Text
                    style={{
                      fontSize: 16,
                      opacity: 0.8,
                    }}
                  >
                    {body}
                  </Text>
                </View>
              </View>
              <View>
                <TextInput
                  style={style.textInput}
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
                    <Text style={{ color: 'red' }}>{nameError}</Text>
                }
                <TouchableOpacity
                  style={{
                    backgroundColor: principalColor,
                    borderRadius: 20,
                    height: 55,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: createDisabled ? 0.5 : 1,
                    marginTop: 20,
                  }}
                  onPress={handleCreateNewComment}
                >
                  <Text
                    style={{
                      fontSize: 28,
                      fontWeight: 'bold',
                      color: 'white'
                    }}
                  >
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

const style = StyleSheet.create({
  textInput: {
    fontSize: 18,
    width: windowWidth * 0.9,
    color: 'black',
    backgroundColor: '#E8E8E8',
    padding: 15,
    borderRadius: 10,
    minWidth: '80%',
  },
  textLabel: {
    marginTop: 5,
    marginBottom: 2,
    fontSize: 15,
    opacity: 0.6,
  },
});

export default AddNewForumPostCommentScreen;