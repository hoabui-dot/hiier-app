import React, { useMemo, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity
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
import { GRAY_COLOR, RED_COLOR, ROUTES } from '../../../constants/ui';
import { GREEN_COLOR, WHITE_COLOR } from '../../../constants/ui';
import { ITheme, useTheme } from 'native-base';
import { IRegistrationAccount } from '../../../types/ui';

export interface InformationRegistrationScreenProps {
  navigation: any;
}

const InformationRegistrationScreen = ({
  navigation,
}: InformationRegistrationScreenProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);
  const [isCheckedMale, setIsCheckedMale] = useState(false);
  const [isCheckedFemale, setIsCheckedFemale] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [OTPMess, setOTPMess] = useState<any>({});
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
          secretHash: response.data?.resource?.secretHash
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
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              placeholder="Họ tên"
              autoCapitalize="none"
              onChangeText={onChange}
              placeholderTextColor={GRAY_COLOR}
              value={value}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              placeholderTextColor={GRAY_COLOR}
              onBlur={onBlur}
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          name="gender"
          control={control}
          render={({ field: { onChange } }) => (
            <View style={[S.checkbox, S.wrapCheckbox]}>
              <View style={[S.checkbox]}>
                <Checkbox
                  value={isCheckedMale}
                  onValueChange={(value) => {
                    onChange('male');
                    setIsCheckedMale(value);
                    setIsCheckedFemale(!value);
                  }}
                />
                <Text style={S.textCheckbox}>Nam</Text>
              </View>
              <View style={[S.checkbox, { marginLeft: 10 }]}>
                <Checkbox
                  value={isCheckedFemale}
                  onValueChange={(value) => {
                    onChange('female');
                    setIsCheckedFemale(value);
                    setIsCheckedMale(!value);
                  }}
                />
                <Text style={S.textCheckbox}>Nữ</Text>
              </View>
            </View>
          )}
        />
        <Controller
          name="identifyNumber"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Số CMND"
              placeholderTextColor={GRAY_COLOR}
              onBlur={onBlur}
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <View style={{ position: 'relative' }}>
          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                placeholder="Số điện thoại"
                placeholderTextColor={GRAY_COLOR}
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
              />
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
    },
    body: {
      paddingHorizontal: 20,
    },
    input: {
      height: 30,
      width: '100%',
      borderColor: GRAY_COLOR,
      borderBottomWidth: 0.5,
      fontSize: 18,
      padding: 7,
      marginTop: 30,
    },
    errorMessage: {
      color: RED_COLOR,
      marginTop: 10
    }
  });
