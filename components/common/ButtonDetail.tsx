import { Heading, ITheme, useTheme, HStack } from 'native-base';
import { ReactNode, useMemo } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
  Text,
  TouchableOpacityProps,
  StyleProp,
} from 'react-native';
import Icon from '../../utils/Icon/Icon'

interface ButtonDetailProps extends TouchableOpacityProps {
  title: ReactNode;
  description?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  headingStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: 'outline' | 'solid';
  rightIcon?: ReactNode;
}

const ButtonDetail = ({
  title,
  description,
  containerStyle,
  textStyle,
  headingStyle,
  variant = 'outline',
  rightIcon,
  ...props
}: ButtonDetailProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  return (
    <TouchableOpacity
      {...props}
      style={[styles.container, styles[`${variant}`], containerStyle]}
    >
      <HStack justifyContent={'space-between'} alignItems={'center'}>
        <View>
          <Heading
            style={[styles.heading, styles[`${variant}Heading`], headingStyle]}
          >
            {title}
          </Heading>
          <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>
            {description}
          </Text>
        </View>
        <Icon as={rightIcon} size={7} color={'violet.500'} />
      </HStack>
    </TouchableOpacity>
  );
};

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({
    container: {
      borderRadius: sizes.radius,
      backgroundColor: colors.white,
      borderColor: colors.violet['500'],
      borderWidth: 1,
      paddingHorizontal: sizes.padding2,
      paddingVertical: sizes.padding * 2,
    },
    solid: {
      backgroundColor: colors.gray['400'],
    },
    outline: {
      backgroundColor: colors.white,
    },
    text: {
      fontSize: fontSizes.sm,
      fontWeight: '400',
      lineHeight: fontSizes.sm * 1.5,
    },
    solidText: {
      color: colors.white,
    },
    outlineText: {
      color: colors.gray['400'],
    },
    heading: {
      fontSize: fontSizes.md,
      fontWeight: '500',
      lineHeight: fontSizes.sm * 1.5,
    },
    solidHeading: {
      color: colors.white,
    },
    outlineHeading: {
      color: colors.violet['500'],
    },
  });

export default ButtonDetail;
