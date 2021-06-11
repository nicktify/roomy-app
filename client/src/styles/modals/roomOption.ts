import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  touchableOpacity: {
    width: 200,
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.7 
  },
  yesDeleteText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    opacity: 0.7,
  },
  
})

export default styles;