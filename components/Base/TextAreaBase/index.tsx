import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import {
  TextArea as NBTextArea,
  ITheme,
  useTheme,
  ITextAreaProps,
} from 'native-base';

interface TextAreaProps extends ITextAreaProps {}

const TextArea = (props: TextAreaProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  return (
    <NBTextArea
      autoCompleteType
      borderColor={'violet.400'}
      borderRadius={'md'}
      color={'gray.500'}
      backgroundColor={'white'}
      {...props}
    />
  );
};

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({});

export default TextArea;
