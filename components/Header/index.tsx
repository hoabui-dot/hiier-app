import { Center, Heading, HStack, Icon, ITheme, useTheme } from 'native-base';
import { ReactNode, useMemo } from 'react';
import { TouchableOpacity, StyleSheet, View, ViewStyle } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface HeaderProps {
  headerText?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  leftPress?: () => void;
  rightPress?: () => void;
  backButton?: boolean;
  shadow?: number | string;
  variant?: 'tab' | 'stack';
}

const Header = ({
  leftIcon,
  rightIcon,
  headerText,
  leftPress,
  rightPress,
  backButton,
  shadow,
  variant = 'stack',
}: HeaderProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  const LeftIconRender = () => {
    if (backButton) {
      return <Icon as={AntDesign} name={'left'} size={6} color={'white'} />;
    } else {
      if (leftIcon) {
        return leftIcon;
      }
    }
    return;
  };

  const RightIconRender = () => {
    if (rightIcon) {
      return rightIcon;
    }
    return;
  };
  return (
      <HStack
      justifyContent={'space-between'}
      alignItems={'center'}
      style={[styles.container, styles[`${variant}Container`]]}
      shadow={shadow}
    >
      <View style={styles.iconWrap}>
        <TouchableOpacity onPress={() => !!leftPress && leftPress()}>
          {LeftIconRender()}
        </TouchableOpacity>
      </View>
      <Heading style={[styles.text, styles[`${variant}Text`]]} size={'sm'}>
        {headerText}
      </Heading>
      <View style={styles.iconWrap}>
        <TouchableOpacity onPress={() => !!rightPress && rightPress()}>
          {RightIconRender()}
        </TouchableOpacity>
      </View>
    </HStack>
  );
};

const makeStyles = ({ colors, sizes }: ITheme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
      // paddingHorizontal: sizes.padding2,
      // paddingVertical: sizes.padding2,
      minHeight: 55,
      position: 'relative',
      zIndex: 999,
      backgroundColor: colors.violet['400'],
    },
    text: {
      textTransform: 'capitalize',
      color: colors.white,
    },
    iconWrap: {
      minWidth: 30,
    },

    stackContainer: {},
    tabContainer: {
      backgroundColor: colors.white,
    },

    stackText: {},
    tabText: {
      color: colors.violet['400'],
    },
  });

export default Header;