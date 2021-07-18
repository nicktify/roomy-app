import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  innerContainer: {
    flex: 0.3,
    flexDirection: 'row',
  },
  topLeftContainer: {
    flex: 1,
  },
  menuIcon: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 30,
    opacity: 0.8
  },
  greetingContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  helloText: {
    fontSize: 20,
    fontWeight: '100',
    opacity: 0.5,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8
  },
  happyLearningText: {
    marginLeft: 10,
    marginTop: 10,
    fontWeight: '100',
    opacity: 0.3
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 16,
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.44,
    shadowRadius: 5,
  },
  bottomInnerContainer: {
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 10,
  },
  roomsContainer: {
    alignItems: 'center',
    borderBottomColor: '#a4a4a4a4',
    borderBottomWidth: 0.5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  yourRoomText: {
    fontSize: 22,
    fontWeight: 'bold',
    opacity: 0.7,
  },
  searchButton: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchButtonText: {
    opacity: 0.7,
  },
  searchIcon: {
    marginLeft: 5,
    opacity: 0.7,
  },
  rightTopContainer: {
    flex: 1,
  },
  profileImage: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 50,
    height: 75,
    width: 75,
    borderRadius: 50,
  },
})

export default styles;
