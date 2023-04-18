import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 45,
    height: 45,
    borderRadius: 5,
    borderWidth: 1,
    color: "#000",
    borderColor: '#ccc'
  },
  wrapContent: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 15
  },
  infoText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center'
  },
  activeCode: {
    marginTop: 20
  }
});

export default styles;
