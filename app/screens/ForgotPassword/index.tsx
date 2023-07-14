import React, { useMemo, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-root-toast';
import G from '../../../utils/GlobalStyles.styled';
import { TaskApi } from '../../../services/api/task';
import {
  GOLD_COLOR,
  GREEN_COLOR,
  PLACE_HOLDER_TEXT_COLOR,
  PURPLE_COLOR,
  ROUTES,
  WHITE_COLOR,
} from '../../../constants/ui';
import Header from '../../../components/Header';
import { ITheme, useTheme } from 'native-base';

export interface ForgotPasswordProps {
  navigation: any;
}

const { width, height } = Dimensions.get('screen');

const ForgotPassword = ({ navigation }: ForgotPasswordProps) => {
  const [response, setResponse] = useState<any>({});
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isFocusInput, setIsFocusInput] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit = async (value: { phone: string }) => {
    setErrorMessage('');
    setIsLoading(true);
    TaskApi.forgotPassword(value)
      .then((response) => {
        setIsLoading(false);
        if (response.status !== 200) {
          return;
        }
        navigation.navigate(ROUTES.CONFIRM_FORGOT_PASSWORD_OTP, {
          otpMessage: response.data.message,
          idHash: response.data?.resource?.idHash,
          phone: value.phone,
        });
        setResponse(response);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.errors.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header headerText="QUÊN MẬT KHẨU" backButton />
      <View style={styles.body}>
        <View style={styles.wrapContent}>
          <Image
            style={{
              height: width / 1.5,
              width: width / 1.5,
            }}
            resizeMode="contain"
            source={require('../../../assets/forgotPassword.png')}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, isFocusInput ? styles.focusInput : {}]}
                onBlur={() => {
                  setIsFocusInput(false);
                  onBlur();
                }}
                placeholderTextColor={PLACE_HOLDER_TEXT_COLOR}
                onFocus={() => setIsFocusInput(true)}
                placeholder="Số điện thoại"
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
        {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
        <TouchableOpacity style={G.button} onPress={handleSubmit(onSubmit)}>
          {isLoading ? (
            <ActivityIndicator color={GOLD_COLOR} size="small" />
          ) : (
            <Text style={G.buttonText}>Tiếp theo</Text>
          )}
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
      backgroundColor: WHITE_COLOR,
    },
    body: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    input: {
      width: width - 28,
      padding: 20,
      marginVertical: 20,
      borderRadius: 8,
      backgroundColor: '#FAFAFA',
      fontSize: 16,
    },
    focusInput: {
      borderWidth: 1,
      borderColor: PURPLE_COLOR,
      backgroundColor: '#F3ECFE',
    },
    wrapContent: {
      alignItems: 'center',
    },
  });
