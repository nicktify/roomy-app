import { StyleSheet } from "react-native";
import { principalColor } from "../../config/colors";

const styles = StyleSheet.create({
  rightTopContainer: {
    flex: 1,
  },
  profileImage: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 50,
    height: 75,
    width: 75,
    borderRadius: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: principalColor,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 100
  },
  button: {
    width: 200,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
    backgroundColor: 'white',
  },
  buttonCancel: {
    width: 200,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
    backgroundColor: "black",
  },
  textStyle: {
    color: principalColor,
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
});

export default styles;