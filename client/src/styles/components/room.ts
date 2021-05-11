import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  roomContainer: {
    borderRadius: 2,
    borderColor: '#e3e3e3',
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    flexDirection: 'row'
  }
});

export default style;