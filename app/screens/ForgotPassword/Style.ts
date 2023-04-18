import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  wrapContent: {
    position: "relative",
    marginTop: 50
  },
  icon: {
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 45,
    height: 60,
    borderRadius: 5,
    borderWidth: 1,
    color: "#000",
    borderColor: '#000'
  }
})

export default styles;