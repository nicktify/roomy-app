import { StyleSheet } from 'react-native'
import { principalColor } from '../../config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  userAddedSuccessText: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
    padding: 20,
  },
  okButton: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: principalColor,
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 10,
  },
  okButtonText: {
    color: 'white'
  },
})

export default styles;