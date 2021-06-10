import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  innerContainer: {
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
  },
  pictureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorNameText: {
    fontSize: 15,
    fontWeight: 'bold',
    opacity: 0.7,
    marginLeft: 10,
  },
  bodyText: {
    fontSize: 15,
    color: 'black',
    margin: 10,
    opacity: 0.8
  },
  image: { 
    width: '100%',
    height: '100%'
  }
})

export default styles;