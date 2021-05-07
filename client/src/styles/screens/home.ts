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
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    justifyContent: 'center',
    paddingTop: 20,
  },
  innerButtomContainer: {
    flex: 1,
    width: '100%',
    height: '90%',
    alignItems: 'center',
    padding: 0,
    paddingHorizontal: 10,
  }
});

export default style;