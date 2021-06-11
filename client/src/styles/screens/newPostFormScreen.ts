import { Dimensions, StyleSheet } from 'react-native'
import { principalColor } from '../../config/colors';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: 'white',
     alignItems: 'center'
   },
   awareScrollView: {
     flex: 1
    },
    cratePostText: {
      color: '#69C1AC',
      fontSize: 30,
      alignSelf: 'center',
      fontWeight: 'bold',
      marginBottom: 15,
    },
    inputContainer: {
      width: windowWidth * 0.9,
      alignSelf: 'center'
    },
    textInput: {
      fontSize: 18,
      width: windowWidth * 0.9,
      color: 'black',
      backgroundColor: '#E8E8E8',
      padding: 15,
      borderRadius: 10,
    },
    imageFormContainer: {
      width: windowWidth,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 20,
    },
    imagePreview: {
      width: 100,
      height: 100,
      borderRadius: 5,
    },
    uploadImageButton: {
      marginLeft: 10,
      borderRadius: 2,
      borderColor: '#4a4a4a',
      borderWidth: 0.1,
      padding: 15,
      alignItems: 'center',
    },
    uploadImageText: {
      color: 'black',
      fontSize: 15,
      opacity: 0.7,
    },
    publishButton: {
      alignItems: 'center',
      backgroundColor: principalColor,
      borderRadius: 20,
      padding: 10,
      justifyContent: 'center',
      marginTop: 18,
      width: windowWidth * 0.5,
      alignSelf: 'center',
    },
    publishButtonText: {
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold',
    },
    
})

export default styles;