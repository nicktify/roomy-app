import { Dimensions, StyleSheet } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white'
  },
  innerContainer: {
    minWidth: '80%',
  },
  title: {
    color: '#69C1AC',
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  textInput: {
    fontSize: 18,
    width: windowWidth * 0.9,
    color: 'black',
    backgroundColor: '#E8E8E8',
    padding: 15,
    borderRadius: 10,
    minWidth: '80%',
    marginBottom: 40,
  },
  roomContainer: {
    borderRadius: 10,
    borderColor: '#e3e3e3',
    width: windowWidth * 0.9,
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
    elevation: 2,
    flexDirection: 'row'
  },
  touchableRoom: {
    width: windowWidth * 0.75,
  },
  roomNameContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  roomNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.7,
    color: 'black',
    maxWidth: '90%',
  },
  moreVertIcon: {
    height: '100%',
    justifyContent: 'center',
    width: 30,
    alignItems: 'center'
  },
  
})

export default styles;