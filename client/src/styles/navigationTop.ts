import { StyleSheet } from "react-native";
import { principalColor } from "../config/colors";

const style = StyleSheet.create({
  navigationTop: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 18,
    color: 'black',
    opacity: 0.8
  },
});

export default style;