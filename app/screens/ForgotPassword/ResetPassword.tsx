import React, { useEffect, useMemo, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import G from '../../../utils/GlobalStyles.styled';
import Header from '../../../components/Header';
import { ITheme, useTheme } from 'native-base';
import Constants from 'expo-constants';
import {
  GOLD_COLOR,
  GRAY_COLOR,
  PURPLE_COLOR,
  RESET_PASSWORD_VALUE,
  ROUTES,
  WHITE_COLOR,
} from '../../../constants/ui';
import Icon from '../../../utils/Icon/Icon';
import Icons from '../../../utils/Icon/Icons';
import { TaskApi } from '../../../services/api/task';
import SuccessNotificationModal from '../../../components/SuccessNotificationModal';

export interface ResetPasswordProps {
  route: any;
  navigation: any;
}

const { height, width } = Dimensions.get('window');

const ResetPassword = ({ route, navigation }: ResetPasswordProps) => {
  const { isShowMessage, idHash } = route.params;
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);
  const [isShownNewPassword, setIsShownNewPassword] = useState<boolean>(false);
  const [isShownConfirmPassword, setIsShownConfirmPassword] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [inputStyle, setInputStyle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccessModal, setIsSuccessModal] = useState<boolean>(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {}, []);

  const onSubmit = async ({
    newPassword,
    confirmPassword,
  }: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    setErrorMessage('');
    if (newPassword === confirmPassword) {
      setIsLoading(true);
      TaskApi.resetPassword({
        idHash: idHash,
        newPassword: newPassword,
      })
        .then((response) => {
          setIsLoading(false);
          setIsSuccessModal(true);
          setTimeout(() => {
            setIsSuccessModal(false);
            navigation.navigate(ROUTES.LOGIN);
          }, 3000);
        })
        .catch((error) => {
          setIsLoading(false);
          setErrorMessage(error.errors.message);
        });
    } else {
      setErrorMessage('Xác nhận mật khẩu không trùng khớp');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header headerText="ĐỔI MẬT KHẨU" backButton />
      <View style={styles.body}>
        <View>
          <View style={styles.wrapImage}>
            <Image
              style={{
                height: width / 1.4,
                width: width / 1.4,
              }}
              resizeMode="contain"
              source={require('../../../assets/resetPassword.png')}
            />
          </View>
          <Text style={styles.description}>Tạo mật khẩu mới cho tài khoản</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={[styles.wrapInput, { marginBottom: 18 }]}>
                <Icon
                  style={styles.inputIcon}
                  color={
                    inputStyle === RESET_PASSWORD_VALUE.NEW_PASSWORD
                      ? PURPLE_COLOR
                      : GRAY_COLOR
                  }
                  as={Icons.Lock}
                />
                <TextInput
                  style={[
                    styles.input,
                    inputStyle === RESET_PASSWORD_VALUE.NEW_PASSWORD
                      ? styles.focusInput
                      : {},
                  ]}
                  onBlur={() => {
                    setInputStyle('');
                    onBlur;
                  }}
                  onFocus={() =>
                    setInputStyle(RESET_PASSWORD_VALUE.NEW_PASSWORD)
                  }
                  placeholder="Mật khẩu mới"
                  placeholderTextColor={GRAY_COLOR}
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={isShownNewPassword}
                />
                <TouchableOpacity
                  onPress={() => setIsShownNewPassword(!isShownNewPassword)}
                  style={styles.shownPassword}
                >
                  {isShownNewPassword ? (
                    <Icon
                      as={Icons.HiddenPassword}
                      color={
                        inputStyle === RESET_PASSWORD_VALUE.NEW_PASSWORD
                          ? PURPLE_COLOR
                          : GRAY_COLOR
                      }
                    />
                  ) : (
                    <Icon
                      as={Icons.ShowPassword}
                      color={
                        inputStyle === RESET_PASSWORD_VALUE.NEW_PASSWORD
                          ? PURPLE_COLOR
                          : GRAY_COLOR
                      }
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}
            rules={{
              required: true,
              minLength: 4,
              maxLength: 16,
            }}
            name="newPassword"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <Icon
                  style={styles.inputIcon}
                  color={
                    inputStyle === RESET_PASSWORD_VALUE.CONFIRM_PASSWORD
                      ? PURPLE_COLOR
                      : GRAY_COLOR
                  }
                  as={Icons.Lock}
                />
                <TextInput
                  style={[
                    styles.input,
                    inputStyle === RESET_PASSWORD_VALUE.CONFIRM_PASSWORD
                      ? styles.focusInput
                      : {},
                  ]}
                  onBlur={() => {
                    setInputStyle('');
                    onBlur;
                  }}
                  onFocus={() =>
                    setInputStyle(RESET_PASSWORD_VALUE.CONFIRM_PASSWORD)
                  }
                  placeholder="Xác nhận mật khẩu"
                  placeholderTextColor={GRAY_COLOR}
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={isShownConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() =>
                    setIsShownConfirmPassword(!isShownConfirmPassword)
                  }
                  style={styles.shownPassword}
                >
                  {isShownConfirmPassword ? (
                    <Icon
                      as={Icons.HiddenPassword}
                      color={
                        inputStyle === RESET_PASSWORD_VALUE.CONFIRM_PASSWORD
                          ? PURPLE_COLOR
                          : GRAY_COLOR
                      }
                    />
                  ) : (
                    <Icon
                      as={Icons.ShowPassword}
                      color={
                        inputStyle === RESET_PASSWORD_VALUE.CONFIRM_PASSWORD
                          ? PURPLE_COLOR
                          : GRAY_COLOR
                      }
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}
            rules={{
              required: true,
              minLength: 4,
              maxLength: 16,
            }}
            name="confirmPassword"
          />
          <Text style={{ color: 'red', marginTop: 8 }}>{errorMessage}</Text>
        </View>
        <View style={styles.wrapConfirmButton}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleSubmit(onSubmit)}
          >
            {isLoading ? (
              <ActivityIndicator color={GOLD_COLOR} size="small" />
            ) : (
              <Text style={G.buttonText}>Xác nhận</Text>
            )}
          </TouchableOpacity>
          <SuccessNotificationModal
            isOpen={isSuccessModal}
            description="Đổi mật khẩu thành công, bạn sẽ được chuyển tới trang đăng nhập trong
          vài giây nữa..."
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;

const makeStyles = (args: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: -Constants.statusBarHeight,
      backgroundColor: WHITE_COLOR,
    },
    body: {
      paddingHorizontal: 15,
      marginTop: 20,
      flex: 1,
    },
    input: {
      width: width - 28,
      padding: 20,
      paddingLeft: 48,
      borderRadius: 8,
      backgroundColor: '#FAFAFA',
      fontSize: 16,
    },
    focusInput: {
      borderWidth: 1,
      borderColor: PURPLE_COLOR,
      backgroundColor: '#F3ECFE',
    },
    shownPassword: {
      position: 'absolute',
      right: 50,
      top: 40,
    },
    wrapImage: {
      alignItems: 'center',
    },
    wrapInput: {
      position: 'relative',
    },
    inputIcon: {
      position: 'absolute',
      top: 20,
      left: 20,
      zIndex: 1,
    },
    confirmButton: {
      backgroundColor: PURPLE_COLOR,
      paddingVertical: 20,
      borderRadius: 30,
      alignItems: 'center',
      marginTop: 'auto',
    },
    wrapConfirmButton: {
      flex: 1,
      paddingVertical: 30,
    },
    description: {
      fontSize: 22,
      marginBottom: 14,
      fontWeight: '500',
    },
  });
