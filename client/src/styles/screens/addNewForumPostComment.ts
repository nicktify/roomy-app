import { Dimensions, StyleSheet } from 'react-native'
import { principalColor } from '../../config/colors';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  keyboardScrollView: {
    flex: 1,
    backgroundColor: 'white'
  },
  keyboardAvoidingView: {
    flex: 1
  },
  touchableWithoutFeedback: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  commentTextContainer: {
    minWidth: '80%',
  },
  addNewCommentText: {
    color: '#69C1AC',
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  postPreviewContainer: {
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
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  authorProfilePicture: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  postContainer: {
    flexDirection: 'row'
  },
  postImage: {
    width: 80,
    height: 80,
    marginRight: 20,
    borderRadius: 5,
  },
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
  bodyText: {
    fontSize: 16,
    opacity: 0.8,
  },
  nameErrorText: {
    color: 'red',
  },
  handleCreateComment: {
    backgroundColor: principalColor,
    borderRadius: 20,
    height: 55,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  addComment: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white'
  },
  
})

export default styles;