import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonOTP: {
    backgroundColor: '#ccc',
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    paddingHorizontal: 5,
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTextOTP: {
    color: 'white',
  },
  wrapContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  checkbox: {
    display: 'flex',
    flexDirection: 'row'
  },
  textCheckbox: {
    marginLeft: 5,
    fontSize: 18
  },
  wrapCheckbox: {
    marginTop: 30
  }
});

export default styles;
