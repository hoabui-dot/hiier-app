import React, { useContext, useMemo, useState } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import S from './styles';
import G from '../../../utils/GlobalStyles.styled';
import { TaskApi } from '../../../services/api/task';
import { ROUTES } from '../../../constants/ui';
import Header from '../../../components/Header';
import { ITheme, useTheme } from 'native-base';

export interface ConfirmOTPProps {
  route: any;
  navigation: any;
}

const ConfirmOTP = ({ route, navigation }: ConfirmOTPProps) => {
  const { otpMessage, fullName, phone, secretHash } = route.params;
  const [errorMessage, setErrorMessage] = useState<string>('');
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header headerText='XÁC NHẬN OTP' backButton/>
      <Text style={S.infoText}>{`Xin chào ${fullName} - ${phone}`}</Text>
      <Text style={S.subTitle}>
        Tải khoản đã đăng ký nhưng chưa kích hoạt, vui lòng kiểm tra tin nhắn và
        nhập mã kích hoạt vào bên dưới
      </Text>
      <Text style={S.activeCode}>Mã kích hoạt</Text>
      <OTPInputView
        pinCount={4}
        style={{ width: '60%', height: 50 }}
        codeInputFieldStyle={S.underlineStyleBase}
        onCodeFilled={async (value) => {
          TaskApi.verifyOTP({otp: value, idHash: secretHash})
            .then((response) => {
              console.log('response', response);
              navigation.navigate(ROUTES.LOGIN, {
                isRegister: true
              });
            })
            .catch((err) => {
              setErrorMessage(err.errors.message);
              console.log(
                '🚀 ~ file: index.tsx:43 ~ onCodeFilled={ ~ err:',
                err
              );
            });
        }}
      />
      <Text style={{ color: 'red' }}>{errorMessage}</Text>
      <Text style={G.successMessage}>{otpMessage}</Text>
    </KeyboardAvoidingView>
  );
};

export default ConfirmOTP;

const makeStyles = (args: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    body: {
      marginTop: 20,
      paddingHorizontal: 20
    },
    input: {
      paddingTop: 20,
    },
  });