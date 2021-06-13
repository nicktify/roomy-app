import { Dimensions, StyleSheet } from 'react-native'
import { principalColor } from '../../../config/colors';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    width: windowWidth * 0.95,
    height: 60,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemPictureContainer: {
    justifyContent: 'center',
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPicture: {
    borderRadius: 50,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 18,
    opacity: 0.8,
    marginHorizontal: 10,
  },
  itemRightContainer: {
    flexDirection: 'row'
  },
  itemOwnerText: {
    fontStyle: 'italic',
    marginRight: 10,
  },

  container: {
    flex: 1,
  },
  innerContainer: {
    alignItems: 'center',
    borderBottomColor: '#a4a4a4a4',
    borderBottomWidth: 0.5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.8,
    alignSelf: 'center',
    marginTop: 10,
  },
  roomParticipantsText: {
    fontSize: 22,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  searchButton: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchIcon: {
    marginLeft: 5,
    opacity: 0.8,
  },
  flatListContainer: {
    flex: 1,
    alignItems: 'center',
  },
  addIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 15,
    backgroundColor: principalColor,
    borderRadius: 50,
  },
})

export default styles;