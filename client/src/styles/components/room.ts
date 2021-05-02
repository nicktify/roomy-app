import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  roomContainer: {
    width: '90%',
    height: 100,
    backgroundColor: 'white',
    marginTop: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  roomName: {
    fontSize: 30,
    fontWeight: 'bold',
    opacity: 0.8
  },
  roomDescription: {
    fontSize: 15,
    fontWeight: '500',
    opacity: 0.8
  },
});

export default style;