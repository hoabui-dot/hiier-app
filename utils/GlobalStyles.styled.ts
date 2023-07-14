import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
import {
  PURPLE_COLOR,
  GREEN_COLOR,
  GRAY_COLOR,
  WHITE_COLOR,
} from '../constants/ui';

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    paddingStart: 10,
    paddingEnd: 10,
  },
  errorMessage: {
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    color: 'red',
    marginTop: 2,
  },
  paragraph: {
    marginTop: 15,
    marginBottom: 5,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    fontWeight: 'bold',
  },
  input: {
    height: 30,
    width: '100%',
    borderColor: GRAY_COLOR,
    borderBottomWidth: 0.5,
    fontSize: 18,
    padding: 7,
    marginTop: 15,
  },
  button: {
    backgroundColor: PURPLE_COLOR,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: WHITE_COLOR,
    marginTop: 15,
  },
  buttonText: {
    letterSpacing: 0.5,
    fontSize: 20,
    color: WHITE_COLOR,
  },
  content: {
    marginTop: 20,
  },
  successMessage: {
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    color: GREEN_COLOR,
    marginTop: 2,
    textAlign: 'center'
  },
});

export default styles;
