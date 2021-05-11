import { StyleSheet } from "react-native";
import { principalColor } from "../../config/colors";

export const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  button: {
    width: 200,
    borderRadius: 20,
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  highlightButton: {
    width: 200,
    borderRadius: 20,
    borderColor: principalColor,
    borderWidth: 1,
    padding: 10,
    margin: 10,
    backgroundColor: "white",
    shadowColor: principalColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: 'black',
    opacity: 0.8,
    fontWeight: "bold",
    textAlign: "center"
  },
  highlightText: {
    color: principalColor,
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
});