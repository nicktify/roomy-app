import { StyleSheet } from "react-native";
import { principalColor } from "../../config/colors";

const style = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  postContainer: {
    marginVertical: 30,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 40,
  },
  postInnerContainer: {
    borderRadius: 20,
    borderColor: '#f1f1f1',
    borderWidth: 2,
    padding: 10,
    width: '90%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 5,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
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
    borderTopColor: '#f1f1f1',
    borderTopWidth: 2,
    height: '50%',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  textInput: {
    marginTop: 20,
    borderRadius: 10,
    borderColor: '#f1f1f1',
    borderWidth: 2,
    height: 100,
    width: '100%',
    textAlign: 'center'
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
    width: 150,
    padding: 10,
  },
  uploadImageButtonText: {
    color: 'black',
    fontSize: 20,
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
    fontSize: 20
  }
});

export default style;