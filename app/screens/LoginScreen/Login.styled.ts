import { StyleSheet } from 'react-native';
import { BLACK_COLOR } from '../../../constants/ui';

const styles = StyleSheet.create({
  input: {
    height: 40,
    flex: 1,
    paddingLeft: 10,
  },
  controller: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  wrapContent: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  box: {
    flexBasis: '30%',
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 20,
    overflow: 'hidden',
  },
  box_logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box_dropdownLanguage: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: BLACK_COLOR,
  },
});

export default styles;
