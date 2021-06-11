import { Dimensions, StyleSheet } from 'react-native'

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  renderItemContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: 68,
    borderRadius: 20,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  renderItemProfilePictureContainer: {
    justifyContent: 'center',
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  renderItemProfilePicture: {
    borderRadius: 50,
  },
  renderItemUserName: {
    fontWeight: 'bold',
    fontSize: 18,
    opacity: 0.8,
    marginHorizontal: 10,
  },
  renderItemOptionsContainer: {
    flexDirection: 'row'
  },
  renderItemOwnerText: {
    fontStyle: 'italic',
    marginRight: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center'
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
  notFoundTextContainer: {
    paddingHorizontal: 20,
  },
  tryAgainText: {
    fontWeight: 'bold',
    fontSize: 30,
    opacity: 0.8,
    marginTop: 20
  },
  correctNameTypeText: {
    fontWeight: 'bold',
    fontSize: 15,
    opacity: 0.8,
    marginTop: 20,
  },
  flatListContainer: {
    width: '100%',
    paddingHorizontal: 10,
    height: '100%',
  },

})

export default styles;