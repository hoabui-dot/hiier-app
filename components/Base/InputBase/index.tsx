import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { IInputProps, Input as NBInput, ITheme, useTheme } from 'native-base';

interface InputProps extends IInputProps {}

const Input = (props: InputProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  return (
      <NBInput
      borderColor={'violet.400'}
      borderRadius={'base'}
      backgroundColor={'white'}
      color={'gray.500'}
      fontSize={'sm'}
      {...props}
    />
  );
};

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({});

export default Input;