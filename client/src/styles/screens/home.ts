import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white'
  },
  topContainer: {
    flex: 0.3,
    flexDirection: 'row'
  },
  bottomContainer: {
    flex: 0.7,
    backgroundColor: '#f1f1f1',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    justifyContent: 'center'
  },
  innerButtomContainer: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    padding: 0,
    paddingHorizontal: 20,
  }
});

export default style;