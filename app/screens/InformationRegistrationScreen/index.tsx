import React, { useState } from 'react';
import { Text, SafeAreaView, TextInput, View, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-root-toast';
import { TaskApi } from '../../../services/api/task';
import axios from 'axios';
import S from './Styles';
import G from '../../../utils/GlobalStyles.styled';
import { useTranslation } from 'react-i18next';
import Checkbox from 'expo-checkbox';
import { ROUTES } from '../../../constants/ui';
import { GREEN_COLOR, WHITE_COLOR } from '../../../constants/ui';
import Constants from 'expo-constants';

export interface InformationRegistrationScreenProps {
  navigation: any;
}

const InformationRegistrationScreen = ({
  navigation,
}: InformationRegistrationScreenProps) => {
  const [isCheckedMale, setIsCheckedMale] = useState(false);
  const [isCheckedFemale, setIsCheckedFemale] = useState(false);
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

  const onSubmit = async (value: any) => {
    TaskApi.requestOTP({
      phone: value.phone,
    })
      .then((response) => {
        if (!response.data) return;

        navigation.navigate(ROUTES.CONFIRM_OTP, {
          ...value,
          otpMessage: response.data.message,
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <SafeAreaView style={[G.container]}>
      <View>
        <Controller
          name="fullName"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={G.input}
              onBlur={onBlur}
              placeholder={t('HIIER_NAME') as any}
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={G.input}
              placeholder={t('PASSWORD') as any}
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
                <Text style={S.textCheckbox}>{t('MALE')}</Text>
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
                <Text style={S.textCheckbox}>{t('FEMALE')}</Text>
              </View>
            </View>
          )}
        />
        <Controller
          name="identifyNumber"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={G.input}
              placeholder={t('IDENTIFY_NUMBER') as any}
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
                style={G.input}
                onBlur={onBlur}
                placeholder={t('PHONE') as any}
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        {OTPMess?.status === 200 ? (
          <Text style={{ color: 'green' }}>{OTPMess.data.message}</Text>
        ) : (
          ''
        )}
        <Pressable onPress={handleSubmit(onSubmit)} style={G.button}>
          <Text style={G.buttonText}>{t('REGISTER')}</Text>
        </Pressable>
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
    </SafeAreaView>
  );
};

export default InformationRegistrationScreen;
