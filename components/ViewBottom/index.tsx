import { ITheme, useTheme, HStack, Center } from 'native-base';
import { useMemo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

interface IViewBottom extends ViewProps {}

const ViewBottom = (props: IViewBottom) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  return (
    <View {...props} style={[styles.container, props.style]}>
      {props.children}
    </View>
  );
};

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({
    container: {
      padding: sizes.padding * 2,
      paddingBottom: sizes.padding * 3,
      backgroundColor: 'white',
      borderTopWidth: 0.5,
      borderColor: colors.gray['200'],
    },
  });

export default ViewBottom;
