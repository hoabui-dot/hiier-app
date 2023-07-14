import React, { useContext, useMemo, useState } from 'react';
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import G from '../../../utils/GlobalStyles.styled';
import { TaskApi } from '../../../services/api/task';
import {
  GOLD_COLOR,
  GREEN_COLOR,
  LIGHT_GRAY_COLOR,
  PURPLE_COLOR,
  ROUTES,
  WHITE_COLOR,
} from '../../../constants/ui';
import Header from '../../../components/Header';
import { ITheme, useTheme } from 'native-base';
import { View } from 'react-native';
import SuccessNotificationModal from '../../../components/SuccessNotificationModal';

export interface ConfirmOTPProps {
  route: any;
  navigation: any;
}

const { height, width } = Dimensions.get('screen');

const RegistrationOTP = ({ route, navigation }: ConfirmOTPProps) => {
  const { otpMessage, fullName, phone, secretHash } = route.params;
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [otpCode, setOtpCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState<boolean>(false);
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  const onVerifyOTP = () => {
    setIsLoading(true);
    TaskApi.verifyOTP({ otp: otpCode, idHash: secretHash })
      .then((response) => {
        setIsLoading(false);
        setIsOpenSuccessModal(true);
        setTimeout(() => {
          setIsOpenSuccessModal(false);
          navigation.navigate(ROUTES.LOGIN, {
            isRegister: true,
          });
        }, 3000);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.errors.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header headerText="XÁC NHẬN OTP" backButton />
      <View style={styles.content}>
        <Text
          style={styles.descriptionText}
        >{`Xin chào ${fullName} - ${phone}`}</Text>
        <Text style={styles.descriptionText}>
          Tải khoản đã đăng ký nhưng chưa kích hoạt, vui lòng kiểm tra tin nhắn
          và nhập mã kích hoạt vào bên dưới
        </Text>
        <Text style={styles.descriptionText}>Mã kích hoạt</Text>
        <OTPInputView
          pinCount={4}
          style={{ height: 60 }}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.codeInputHighlightStyle}
          onCodeFilled={setOtpCode}
        />
        <Text style={{ color: 'red', paddingTop: 10 }}>{errorMessage}</Text>
        <Text style={styles.otpMessage}>{otpMessage}</Text>
        <TouchableOpacity style={styles.confirmButton} onPress={onVerifyOTP}>
          {isLoading ? (
            <ActivityIndicator color={GOLD_COLOR} size="small" />
          ) : (
            <Text style={styles.confirmButtonText}>Xác nhận</Text>
          )}
        </TouchableOpacity>
      </View>
      <SuccessNotificationModal
        isOpen={isOpenSuccessModal}
        description="Đăng ký tài khoản thành công, bạn sẽ được di chuyển đến trang đăng nhập trong vài giây nữa ..."
      />
    </KeyboardAvoidingView>
  );
};

export default RegistrationOTP;

const makeStyles = (args: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 14,
    },
    input: {
      paddingTop: 20,
    },
    underlineStyleBase: {
      width: (width - 70) / 4,
      height: 60,
      borderRadius: 5,
      borderWidth: 1,
      color: '#000',
      borderColor: '#ccc',
      backgroundColor: LIGHT_GRAY_COLOR,
    },
    codeInputHighlightStyle: {
      borderWidth: 1,
      borderColor: PURPLE_COLOR,
      backgroundColor: '#F3ECFE',
    },
    descriptionText: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 10,
    },
    confirmButton: {
      backgroundColor: PURPLE_COLOR,
      width: '100%',
      paddingVertical: 20,
      borderRadius: 30,
      alignItems: 'center',
      marginTop: 30,
    },
    otpMessage: {
      color: GREEN_COLOR,
      paddingVertical: 10,
    },
    confirmButtonText: {
      color: WHITE_COLOR,
      fontSize: 18,
      fontWeight: '500',
    },
  });
