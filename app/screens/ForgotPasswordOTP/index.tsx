import { ITheme, useTheme } from 'native-base';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView, Dimensions, ActivityIndicator } from 'react-native';
import Header from '../../../components/Header';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Constants from 'expo-constants';
import { View } from 'react-native';
import {
  GOLD_COLOR,
  GREEN_COLOR,
  LIGHT_GRAY_COLOR,
  ONE_MINUTE,
  PURPLE_COLOR,
  ROUTES,
  WHITE_COLOR,
} from '../../../constants/ui';
import { TaskApi } from '../../../services/api/task';

const { height, width } = Dimensions.get('screen');

const ForgotPasswordOTP = ({ navigation, route }: any) => {
  const theme = useTheme();
  const [otpMessage, setOtpMessage] = useState<string>(route.params.otpMessage);
  const styles = useMemo(() => makeStyles(theme), []);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timeToReCallApi, setTimeToReCallApi] = useState<number>(ONE_MINUTE);
  const [otpCode, setOtpCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setTimeout(() => {
      if (timeToReCallApi > 0) {
        setTimeToReCallApi(timeToReCallApi - 1);
      }
      if (timeToReCallApi === 0) {
        TaskApi.forgotPassword({ phone: route.params.phone }).then((res) =>
          setOtpMessage(res.data?.message)
        );
        setTimeToReCallApi(ONE_MINUTE);
      }
    }, 1000);
  }, [timeToReCallApi]);

  return (
    <SafeAreaView style={styles.container}>
      <Header headerText="Confirm OTP" backButton />
      <View style={styles.content}>
        <Text
          style={styles.descriptionText}
        >{`Mã xác nhận sẽ gửi đến ${route.params.phone}`}</Text>
        <OTPInputView
          style={{ height: 60 }}
          pinCount={4}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.codeInputHighlightStyle}
          onCodeFilled={(code: string) => setOtpCode(code)}
        />
        <View style={styles.resendCodeText}>
          <Text style={{color: 'red'}}>{errorMessage}</Text>
          <Text style={styles.otpMessage}>{otpMessage}</Text>
        </View>
        <View style={styles.resendCodeText}>
          <Text>
            Gửi lại mã xác nhận sau{' '}
            <Text style={styles.secondText}>{timeToReCallApi}</Text> giây
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setIsLoading(true);
            TaskApi.verifyForgotPassword({
              otp: otpCode,
              idHash: route.params.idHash,
            }).then((res) => {
              setIsLoading(false);
              if (res?.status !== 200) {
                return;
              }

              navigation.navigate(ROUTES.RESET_PASSWORD, {
                isShowMessage: true,
                idHash: route.params.idHash,
              });
            }).catch(error => {
              setIsLoading(false);
              setErrorMessage(error.errors.message)
            });
          }}
          style={styles.confirmButton}
        >
          {isLoading ? (
            <ActivityIndicator color={GOLD_COLOR} size="small" />
          ) : (
            <Text style={styles.confirmButtonText}>Xác Nhận</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordOTP;

const makeStyles = ({ colors }: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      marginTop: -Constants.statusBarHeight,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 14,
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
    confirmButton: {
      marginTop: 30,
      backgroundColor: PURPLE_COLOR,
      paddingVertical: 20,
      borderRadius: 30,
    },
    confirmButtonText: {
      color: WHITE_COLOR,
      textAlign: 'center',
      fontSize: 18,
    },
    secondText: {
      fontSize: 16,
      color: PURPLE_COLOR,
    },
    resendCodeText: {
      alignItems: 'center',
      marginVertical: 14,
    },
    otpMessage: {
      color: GREEN_COLOR,
    },
    descriptionText: {
      textAlign: 'center',
      marginBottom: 10,
      fontSize: 18,
    },
  });
