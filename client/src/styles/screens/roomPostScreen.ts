import { StyleSheet } from "react-native";
import { principalColor } from "../../config/colors";

const style = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f1f1f1',
  },
  postContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  postInnerContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    width: '90%',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postTopContainer: {
    height: 50,
    marginTop: 10,
  },
  image: {
    borderRadius: 5,
    height: '100%'
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  textContainer: {
    width: '90%'
  },
  addIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 15,
    backgroundColor: principalColor,
    borderRadius: 50,
  },
  form: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  textInput: {
    color: 'black',
    fontSize: 18,
    marginTop: 20,
    borderRadius: 10,
    borderColor: '#f1f1f1',
    borderWidth: 2,
    width: '100%',
    opacity: 0.8,
  },
  buttonsFormContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    width: '100%',
  },
  uploadImageButton: {
    borderRadius: 20,
    margin: 30,
    borderColor: '#f1f1f1',
    borderWidth: 2,
    padding: 10,
  },
  uploadImageButtonText: {
    color: 'black',
    fontSize: 20,
    opacity: 0.7,
  },
  publishFormButton: {
    backgroundColor: principalColor,
    borderRadius: 30,
    width: 150,
    padding: 10,
    alignItems: 'center'
  },
  cancelFormButton: {
    backgroundColor: 'black',
    borderRadius: 30,
    width: 150,
    padding: 10,
    alignItems: 'center'
  },
  cancelFormText: {
    color: 'white',
    fontSize: 20,
    opacity: 0.8,
  },
  authorProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  }

});

export default style;