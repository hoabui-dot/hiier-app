import React from 'react';
import { View, Text } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import S from './styles';
import G from '../../../utils/GlobalStyles.styled';
import axios from 'axios';

export interface ConfirmOTPProps {
  route: any;
  navigation: any;
}

const ConfirmOTP = ({ route, navigation }: ConfirmOTPProps) => {
  const { fullName, gender, identifyNumber, password, phone, otpMessage } = route.params;

  return (
    <View style={[G.container, S.wrapContent]}>
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
        onCodeFilled={ async (value) => {
          const otp = otpMessage.split(' - ')[1]
          if(otp === value) {
            try {
              await axios.post(`${process.env.REACT_APP_API}/api/account/employee-registration`,
                {
                  password: password,
                  phone: phone,
                  fullName: fullName,
                  identifyNumber: identifyNumber,
                  gender: gender,
                  otp: otp
                }
                ).then((response) => {
                  if(response.status === 200) {
                    navigation.navigate('Login')
                  }
                })
            } catch (err) {
              //TODO: resolve this error
              console.log("err", err)
            }
          }
        }}
      />
      <Text style={G.successMessage}>{otpMessage}</Text>
    </View>
  );
};

export default ConfirmOTP;
