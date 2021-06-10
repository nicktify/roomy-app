import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 280,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  innerContainer: {
    marginHorizontal: 10,
  },
  image: {
    borderRadius: 50,
  },
})

export default styles;