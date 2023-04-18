import React, { useState } from 'react';
import { Text, View, TextInput, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-root-toast';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import axios from 'axios';
import G from '../../../utils/GlobalStyles.styled';
import S from './Style';
import { useTranslation } from 'react-i18next';

export interface ForgotPasswordProps {
  navigation: any;
}

const ForgotPassword = ({ navigation }: ForgotPasswordProps) => {
  const [responseOfForgetPassword, setResponse] = useState<any>({});
  const [toastMessage, setToastMessage] = useState<string>('');
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit = async (value: { phone: string }) => {
    try {
      const responseOfForgetPassword = await axios.post(
        `${process.env.REACT_APP_API}/api/account/request-forget-password`,
        value
      );
      setResponse(responseOfForgetPassword);
      // TODO: refactor any type
    } catch (error: any) {
      setToastMessage(error.message);
    }
  };

  return (
    <View style={G.container}>
      <View>
        <View style={S.wrapContent}>
          <TextInput style={G.paragraph}>{`${t('PHONE')}:`}</TextInput>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={G.input}
                onBlur={onBlur}
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
              />
            )}
            rules={{
              required: true,
              minLength: 4,
              maxLength: 16,
            }}
            name="phone"
          />
        </View>
        {responseOfForgetPassword?.status && (
          <Text
            style={
              responseOfForgetPassword?.status === 200
                ? G.successMessage
                : G.errorMessage
            }
          >
            {responseOfForgetPassword.data.message}
          </Text>
        )}
        <Pressable style={G.button} onPress={handleSubmit(onSubmit)}>
          <Text style={G.buttonText}>Tiếp theo</Text>
        </Pressable>
      </View>
      {responseOfForgetPassword?.status && (
        <View>
          <Text style={{ fontWeight: 'bold' }}>OTP:</Text>
          <OTPInputView
            style={{ width: '100%', paddingHorizontal: 20, height: 80 }}
            pinCount={6}
            codeInputFieldStyle={S.underlineStyleBase}
            onCodeFilled={async (code) => {
              try {
                const response = await axios.post(
                  `${process.env.REACT_APP_API}/api/account/verify-otp`,
                  {
                    otp: code,
                    idHash: responseOfForgetPassword?.data.resource?.idHash,
                  }
                );
                if (response.status === 200) {
                  navigation.navigate('ResetPassword', {
                    isShowMessage: response.status === 200 ? true : false,
                  });
                } else {
                  setToastMessage(response.data.message);
                }
                // TODO: refactor any type
              } catch (error: any) {
                setToastMessage(error.message);
              }
            }}
          />
        </View>
      )}
      {toastMessage !== '' && (
        <Toast
          visible={toastMessage !== ''}
          position={100}
          duration={500}
          shadow={false}
          animation={true}
          textStyle={{ color: 'white', fontSize: 16 }}
          hideOnPress={true}
          onShown={() => {
            setTimeout(() => {
              setToastMessage('');
            }, 2000);
          }}
          backgroundColor="red"
        >
          {toastMessage}
        </Toast>
      )}
    </View>
  );
};

export default ForgotPassword;
