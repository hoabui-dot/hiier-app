import React, { useMemo, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-root-toast';
import Header from '../../../components/Header';
import { TaskApi } from '../../../services/api/task';
import axios from 'axios';
import S from './Styles';
import G from '../../../utils/GlobalStyles.styled';
import { useTranslation } from 'react-i18next';
import Checkbox from 'expo-checkbox';
import {
  FOCUS_INPUT_WITH_REGISTRATION,
  GRAY_COLOR,
  PURPLE_COLOR,
  RED_COLOR,
  ROUTES,
} from '../../../constants/ui';
import { GREEN_COLOR, WHITE_COLOR } from '../../../constants/ui';
import { ITheme, useTheme } from 'native-base';
import { IRegistrationAccount } from '../../../types/ui';
import Icons from '../../../utils/Icon/Icons';
import Icon from '../../../utils/Icon/Icon';

export interface InformationRegistrationScreenProps {
  navigation: any;
}

const { height, width } = Dimensions.get('window');

const InformationRegistrationScreen = ({
  navigation,
}: InformationRegistrationScreenProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);
  const [isCheckedMale, setIsCheckedMale] = useState(false);
  const [isCheckedFemale, setIsCheckedFemale] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isBlurInput, setIsBlurInput] = useState<string>('');
  const [OTPMess, setOTPMess] = useState<any>({});
  const [isShownPassword, setIsShownPassword] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      password: '',
      phone: '',
      identifyNumber: '',
      gender: '',
    },
  });

  const { t } = useTranslation();

  const onSubmit = async (value: IRegistrationAccount) => {
    TaskApi.registration(value)
      .then((response) => {
        setErrorMessage('');
        if (!response.data) return;

        navigation.navigate(ROUTES.CONFIRM_OTP, {
          otpMessage: response.data?.message,
          fullName: value.fullName,
          phone: value.phone,
          secretHash: response.data?.resource?.secretHash,
        });
      })
      .catch((error) => setErrorMessage(error.errors.message));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Header headerText="ĐĂNG KÝ TÀI KHOẢN" backButton />
      <View style={styles.body}>
        <Controller
          name="fullName"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.wrapInput}>
              <TextInput
                style={[
                  styles.input,
                  isBlurInput === FOCUS_INPUT_WITH_REGISTRATION.NAME
                    ? styles.focusInput
                    : {},
                ]}
                onFocus={() =>
                  setIsBlurInput(FOCUS_INPUT_WITH_REGISTRATION.NAME)
                }
                onBlur={() => {
                  setIsBlurInput('');
                  onBlur;
                }}
                placeholder="Họ tên"
                autoCapitalize="none"
                onChangeText={onChange}
                placeholderTextColor={GRAY_COLOR}
                selectionColor={PURPLE_COLOR}
                value={value}
              />
            </View>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.wrapInput}>
              <TextInput
                style={[
                  styles.input,
                  isBlurInput === FOCUS_INPUT_WITH_REGISTRATION.PASSWORD
                    ? styles.focusInput
                    : {},
                ]}
                placeholder="Mật khẩu"
                placeholderTextColor={GRAY_COLOR}
                onFocus={() =>
                  setIsBlurInput(FOCUS_INPUT_WITH_REGISTRATION.PASSWORD)
                }
                onBlur={() => {
                  setIsBlurInput('');
                  onBlur;
                }}
                secureTextEntry={isShownPassword}
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
              />
              <TouchableOpacity
                onPress={() => setIsShownPassword(!isShownPassword)}
                style={styles.shownPassword}
              >
                {isShownPassword ? (
                  <Icon
                    as={Icons.HiddenPassword}
                    color={
                      isBlurInput === FOCUS_INPUT_WITH_REGISTRATION.PASSWORD
                        ? PURPLE_COLOR
                        : GRAY_COLOR
                    }
                  />
                ) : (
                  <Icon
                    as={Icons.ShowPassword}
                    color={
                      isBlurInput === FOCUS_INPUT_WITH_REGISTRATION.PASSWORD
                        ? PURPLE_COLOR
                        : GRAY_COLOR
                    }
                  />
                )}
              </TouchableOpacity>
            </View>
          )}
        />
        <Controller
          name="gender"
          control={control}
          render={({ field: { onChange } }) => (
            <View style={styles.wrapCheckbox}>
              <View style={[S.checkbox]}>
                <Checkbox
                  style={styles.checkbox}
                  value={isCheckedMale}
                  onValueChange={(value) => {
                    onChange('male');
                    setIsCheckedMale(value);
                    setIsCheckedFemale(!value);
                  }}
                  color={PURPLE_COLOR}
                />
                <Text style={styles.checkboxText}>Nam</Text>
              </View>
              <View style={[S.checkbox, { marginLeft: 10 }]}>
                <Checkbox
                  style={styles.checkbox}
                  value={isCheckedFemale}
                  onValueChange={(value) => {
                    onChange('female');
                    setIsCheckedFemale(value);
                    setIsCheckedMale(!value);
                  }}
                  color={PURPLE_COLOR}
                />
                <Text style={styles.checkboxText}>Nữ</Text>
              </View>
            </View>
          )}
        />
        <Controller
          name="identifyNumber"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.wrapInput}>
              <TextInput
                style={[
                  styles.input,
                  isBlurInput === FOCUS_INPUT_WITH_REGISTRATION.IDENTIFY
                    ? styles.focusInput
                    : {},
                ]}
                placeholder="Số CMND"
                placeholderTextColor={GRAY_COLOR}
                onFocus={() =>
                  setIsBlurInput(FOCUS_INPUT_WITH_REGISTRATION.IDENTIFY)
                }
                onBlur={() => {
                  setIsBlurInput('');
                  onBlur;
                }}
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
        />
        <View style={{ position: 'relative' }}>
          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.wrapInput}>
                <TextInput
                  style={[
                    styles.input,
                    isBlurInput === FOCUS_INPUT_WITH_REGISTRATION.PHONE
                      ? styles.focusInput
                      : {},
                  ]}
                  onFocus={() =>
                    setIsBlurInput(FOCUS_INPUT_WITH_REGISTRATION.PHONE)
                  }
                  onBlur={() => {
                    setIsBlurInput('');
                    onBlur;
                  }}
                  placeholder="Số điện thoại"
                  placeholderTextColor={GRAY_COLOR}
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
          />
        </View>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        {OTPMess?.status === 200 ? (
          <Text style={{ color: GREEN_COLOR }}>{OTPMess.data.message}</Text>
        ) : (
          ''
        )}
        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={G.button}>
          <Text style={G.buttonText}>Đăng Ký</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Toast
          // visible={isSuccessMessage}
          position={50}
          shadow={false}
          animation={false}
          hideOnPress={true}
          backgroundColor={GREEN_COLOR}
          textColor={WHITE_COLOR}
        >
          {t('SIGN_UP_SUCCESSFULL')}
        </Toast>
      </View>
    </KeyboardAvoidingView>
  );
};

export default InformationRegistrationScreen;

const makeStyles = (args: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: WHITE_COLOR,
    },
    body: {
      width: width,
      height: height,
      paddingHorizontal: 14,
    },
    errorMessage: {
      color: RED_COLOR,
      marginTop: 10,
    },
    input: {
      width: width - 28,
      padding: 20,
      borderRadius: 8,
      backgroundColor: '#FAFAFA',
      fontSize: 16,
    },
    checkbox: {
      borderColor: PURPLE_COLOR,
      borderWidth: 3,
      borderRadius: 6,
    },
    checkboxText: {
      marginLeft: 4,
      fontSize: 18,
      fontWeight: '500',
    },
    wrapCheckbox: {
      flexDirection: 'row',
      marginTop: 18,
    },
    focusInput: {
      borderWidth: 1,
      borderColor: PURPLE_COLOR,
      backgroundColor: '#F3ECFE',
    },
    shownPassword: {
      position: 'absolute',
      right: 20,
      top: 20,
    },
    wrapInput: {
      marginTop: 20,
      position: 'relative',
    },
  });
