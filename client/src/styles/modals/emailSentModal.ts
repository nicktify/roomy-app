import { Dimensions, StyleSheet } from 'react-native'
import { principalColor } from '../../config/colors';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  innerContainer: {
    backgroundColor: 'white',
    width: windowWidth * 0.8,
    alignSelf: 'center',
    borderRadius: 20,
    padding: 20,
  },
  emailSentText: {
    opacity: 0.9,
  },
  okButton: {
    backgroundColor: principalColor,
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  okButtonText: {
    color: 'white',
  },
  
})

export default styles;