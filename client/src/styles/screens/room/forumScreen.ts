import { StyleSheet } from 'react-native'
import { principalColor } from '../../../config/colors';

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 8,
  },
  itemInnerContainer: {
    borderRadius: 5,
    backgroundColor: 'white',
    width: '95%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  itemTopContainer: {
    height: 50,
    marginTop: 5,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  itemAuthorInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemAuthorProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  itemMoreVertIconContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemImageContainer: {
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: '#f1f1f1',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemLatestCommentContainer: {
    width: '90%',
    alignSelf: 'flex-end',
    borderTopWidth: 0.3,
    borderTopColor: '#b5b5b5',
    padding: 5,
  },
  itemLatestCommentAuthorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLatestCommentAuthorPicture: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
  itemLatestCommentIcon: {
    marginRight: 10,
  },
  itemLatestCommentAuthorName: {
    fontWeight: 'bold',
    opacity: 0.8,
  },
  itemLatestCommentBody: {
    opacity: 0.8,
  },
  itemButtonsContainer: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'flex-end',
  },
  itemAddCommentButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: 150,
    alignItems: 'center',
    padding: 5,
    marginRight: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  itemAddCommentButtonText: {
    color: 'black',
    opacity: 0.8,
  },
  itemMoreButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: '20%',
    alignItems: 'center',
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  itemMoreButtonText: {
    opacity: 0.8,
    color: 'black',
  },
  container: {
    flex: 1,
  },
  icon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 15,
    backgroundColor: principalColor,
    borderRadius: 50,
  },
  
})

export default styles;