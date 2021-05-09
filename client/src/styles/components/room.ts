import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  roomContainer: {
    borderRadius: 10,
    borderColor: '#e3e3e3',
    width: '95%',
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingLeft: 10,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  roomName: {
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.7,
    color: 'black'
  },
});

export default style;