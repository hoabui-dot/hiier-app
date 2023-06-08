import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { ITextProps, Text as NBText, ITheme, useTheme } from 'native-base';

interface TextProps extends ITextProps {}

const Text = (props: TextProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  return (
    <NBText
      fontSize={'sm'}
      color={'gray.500'}
      fontWeight={'normal'}
      {...props}
    />
  );
};

const makeStyles = ({ colors, fontSizes }: ITheme) => StyleSheet.create({});

export default Text;
