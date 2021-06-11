import { Dimensions, StyleSheet } from 'react-native'
import { principalColor } from '../../config/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  title: {
    color: '#69C1AC',
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  textInput: {
    maxWidth: windowWidth * 0.9,
    fontSize: 18,
    width: windowWidth * 0.9,
    color: 'black',
    backgroundColor: '#E8E8E8',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 20,
  },
  searchButton: {
    alignItems: 'center',
    backgroundColor: principalColor,
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    width: windowWidth * 0.5,
    alignSelf: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold'
  },
  showNotFoundContainer: {
    paddingHorizontal: 20,
  },
  showNotFoundTextOne: {
    fontWeight: 'bold',
    fontSize: 30,
    opacity: 0.8,
    marginTop: 20
  },
  showNotFoundTextTwo: {
    fontWeight: 'bold',
    fontSize: 15,
    opacity: 0.8,
    marginTop: 20
  },
  userContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    flexDirection: 'row',
    minHeight: 100,
    marginTop: 20,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: windowWidth * 0.9,
  },
  userInnercontainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '60%',
  },
  userProfilePicture: {
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    opacity: 0.8,
    marginLeft: 10
  },
  userIsParticipantErrorText: {
    color: 'red',
    fontStyle: 'italic',
    fontSize: 12,
    marginTop: 10,
  },
  userActionButtonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  viewUserButton: {
    backgroundColor: principalColor,
    borderRadius: 10,
    width: windowWidth * 0.4,
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewUserButtonText: {
    color: 'white',
  },
  addUserButton: {
    backgroundColor: principalColor,
    borderRadius: 10,
    width: windowWidth * 0.4,
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addUserButtonText: {
    color: 'white',
  },
})

export default styles;