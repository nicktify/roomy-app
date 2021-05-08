import { StyleSheet } from "react-native";

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
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
    backgroundColor: "#2196F3",
  },
  buttonCancel: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
});

export default styles;