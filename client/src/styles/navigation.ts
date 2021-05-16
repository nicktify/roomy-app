import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  navigationBottom: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  navigationBottomIcon: {
    opacity: 0.5,
  },
});

export default style;