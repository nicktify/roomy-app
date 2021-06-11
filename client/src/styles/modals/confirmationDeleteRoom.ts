import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  innerContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  areYouSureText: {
    fontSize: 18,
    marginBottom: 15
  },
  yesDeleteButton: {
    width: 200,
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    margin: 10,
    backgroundColor: 'red',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  yesDeleteButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.9,
    color: 'white'
  },
  cancelButton: {
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
  cancelButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.7
  },
  
})

export default styles;