import {
  Actionsheet,
  IActionsheetProps,
  ITheme,
  View,
  useTheme,
} from 'native-base';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import ButtonBase from './ButtonBase';

interface AuthModalProps extends IActionsheetProps {
  registerNavigation: () => void;
  loginNavigation: () => void;
}

const AuthModal = ({
  isOpen,
  onClose,
  registerNavigation,
  loginNavigation,
  ...props
}: AuthModalProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  const handleItemPress = (navigation: 'login' | 'register') => {
    if (navigation === 'login') {
      loginNavigation();
      onClose && onClose();
    } else {
      registerNavigation();
      onClose && onClose();
    }
  };

  return (
    <Actionsheet {...props} isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <ButtonBase
          variant={'solid'}
          containerStyle={styles.button}
          onPress={() => handleItemPress('login')}
          title='Login'
          accessibilityLabel='Learn more about this purple button'
        />
        <ButtonBase
          containerStyle={styles.button}
          onPress={() => handleItemPress('register')}
          title='Register'
          accessibilityLabel='Learn more about this purple button'
        />
      </Actionsheet.Content>
    </Actionsheet>
  );
};

const makeStyles = ({ colors, sizes }: ITheme) =>
  StyleSheet.create({
    button: {
      width: sizes['3/5'],
      marginBottom: sizes.padding,
    },
  });

export default AuthModal;
