import React, { useMemo, useState } from 'react';
import { Text, View, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-root-toast';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import G from '../../../utils/GlobalStyles.styled';
import S from './Style';
import { useTranslation } from 'react-i18next';
import { TaskApi } from '../../../services/api/task';
import { GREEN_COLOR, ROUTES } from '../../../constants/ui';
import Header from '../../../components/Header';
import { ITheme, useTheme } from 'native-base';

export interface ForgotPasswordProps {
  navigation: any;
}

const ForgotPassword = ({ navigation }: ForgotPasswordProps) => {
  const [response, setResponse] = useState<any>({});
  const [toastMessage, setToastMessage] = useState<string>('');
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit = async (value: { phone: string }) => {
    TaskApi.forgotPassword(value).then((response) => {
      if(response.status !== 200) {
        return;
      }
      setResponse(response);
    }).catch(err => {
      console.log('err', err);
    })
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header headerText='QUÊN MẬT KHẨU'  backButton />
      <View style={styles.body}>
        <View style={S.wrapContent}>
          <TextInput style={G.paragraph}>Số điện Thoại:</TextInput>
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
        {response?.status && (
          <Text
            style={
              response?.status === 200
                ? G.successMessage
                : G.errorMessage
            }
          >
            {response.data.message}
          </Text>
        )}
        {response?.status && (
        <View>
          <Text style={{ fontWeight: 'bold' }}>OTP:</Text>
          <OTPInputView
            style={{ width: '100%', paddingHorizontal: 20, height: 80 }}
            pinCount={4}
            codeInputFieldStyle={S.underlineStyleBase}
            onCodeFilled={async (code) => {
              TaskApi.verifyForgotPassword({
                otp: code,
                idHash: response.data?.resource?.idHash
              }).then(res => {
                if(res?.status !== 200) {
                  return;
                }
                navigation.navigate(ROUTES.RESET_PASSWORD, {
                  isShowMessage: true,
                  idHash: response.data?.resource?.idHash
                });
              }) 
            }}
          />
        </View>
      )}
        <TouchableOpacity style={G.button} onPress={handleSubmit(onSubmit)}>
          <Text style={G.buttonText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
      {!!toastMessage.length && (
        <Toast
          visible={!!toastMessage.length}
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
          backgroundColor={GREEN_COLOR}
        >
          {toastMessage}
        </Toast>
      )}
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

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
