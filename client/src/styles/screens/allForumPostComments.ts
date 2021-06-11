import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  renderItemContainer: {
    width: '90%',
    alignSelf: 'flex-end',
    borderTopWidth: 0.3,
    borderTopColor: '#b5b5b5',
    padding: 5,
  },
  renderItemInnerContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  renderItemProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  renderItemProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
  renderItemIcon: {
    marginRight: 5,
  },
  renderItemAuthorNameText: {
    fontWeight: 'bold',
    opacity: 0.8,
  },
  renderItemMoreVertContainer: {
    width: '10%',
    height: '100%',
  },
  renderItemBodyText: {
    opacity: 0.8,
  },
  postContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 8,
  },
  postInnerContainer: {
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
  postTopContainer: {
    height: 50,
    marginTop: 5,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  authorInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  authorNameText: {
    fontSize: 15,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    opacity: 0.8,
  },
  authorNameContainer: {
    justifyContent: 'center',
  },
  selectedImagePostButton: {
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: '#f1f1f1',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
  },

})

export default styles;