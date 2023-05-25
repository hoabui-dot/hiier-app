import { HStack, ITheme, useTheme } from 'native-base';
import { ReactNode, useMemo } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import Icon from '../../utils/Icon/Icon';
import Icons from '../../utils/Icon/Icons';

interface TouchableIconProps extends TouchableOpacityProps {
  title: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const TouchableIcon = ({
  title,
  containerStyle,
  textStyle,
  iconLeft,
  iconRight,
  ...props
}: TouchableIconProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  return (
    <TouchableOpacity {...props} style={[styles.container, containerStyle]}>
      <HStack justifyContent="space-between" alignItems="center">
        <HStack alignItems={'center'} flexShrink={1}>
          {iconLeft ?? <Icon as={Icons.Smile} />}
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </HStack>
        {iconRight ?? <Icon as={Icons.Right} />}
      </HStack>
    </TouchableOpacity>
  );
};

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({
    container: {
      // padding: sizes.padding * 2,
      borderBottomColor: colors.gray['200'],
      borderBottomWidth: 1,
      backgroundColor: colors.white,
    },
    text: {
      // marginLeft: sizes.padding,
      color: colors.gray['500'],
      fontWeight: '500',
      fontSize: fontSizes.md,
      flexShrink: 1,
    },
  });

export default TouchableIcon;
