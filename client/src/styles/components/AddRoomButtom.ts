import { StyleSheet } from "react-native";
import { principalColor } from "../../config/colors";

const style = StyleSheet.create({
  buttom: {
    backgroundColor: principalColor,
    width: 100,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white'
  }
})

export default style;