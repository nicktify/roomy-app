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
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.44,
    shadowRadius: 5,
    
    elevation: 16,
  },
  innerButtomContainer: {
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
  }
});

export default style;