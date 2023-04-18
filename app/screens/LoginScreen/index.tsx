import React, { useState } from 'react';
import Toast from 'react-native-root-toast';
import { Link } from '@react-navigation/native';
import Svg, { Image } from 'react-native-svg';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ILoginAccount } from '../../../types/ui';

import { defaultLoginValue } from '../../../constants/ui';
import { USER_TYPE } from '../../../constants/ui';
import { WHITE_COLOR, GREEN_COLOR } from '../../../constants/ui';

import {
  Text,
  SafeAreaView,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { TaskApi } from '../../../services/api/task';

import S from './Login.styled';
import G from '../../../utils/GlobalStyles.styled';
// import DropdownPhoneCode from './DropdownPhoneCode';

export interface LoginProps {
  navigation: any;
}

const Login = ({ navigation }: any) => {
  // TODO: get default value by isoCode
  const [responseOfData, setResponseOfData] = useState<any>({});
  const [isSuccessMessage, setIsSuccessMessage] = useState<boolean>(false);
  const { control, handleSubmit } = useForm({
    defaultValues: defaultLoginValue,
  });
  const { t } = useTranslation();

  const { height } = Dimensions.get('window');

  const onSubmit = async (value: ILoginAccount) => {
    TaskApi.login({
      phone: value.phone,
      password: value.password,
      role: USER_TYPE.EMPLOYEE,
    }).then((response: any) => {
      setResponseOfData(response);
      navigation.navigate('Hiier', {
        secretHash: response?.resource?.secretHash,
        token: response?.resource?.token,
      });
    });
  };

  return (
    <SafeAreaView style={G.container}>
      <View style={S.wrapContent}>
        <View style={[S.box, S.box_logo]}>
          <View style={S.image}>
            <Svg height={110} width={110}>
              <Image
                width={110}
                height={110}
                href={require('../../../assets/hi_logo.png')}
              />
            </Svg>
          </View>
          <Text style={S.title}>{t('FOR_PARTNER')}</Text>
        </View>
        <View style={[S.box, { height: height / 2, width: '100%' }]}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={S.controller}>
                {/* <View>
                  <DropdownPhoneCode />
                </View> */}
                <TextInput
                  style={[G.input, S.input]}
                  // TODO: refactor any type
                  placeholder={t('ENTER_PHONE') as any}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
            rules={{
              minLength: 4,
              maxLength: 16,
            }}
            name="phone"
          />
          {responseOfData?.response?.status === 400 && (
            <Text style={G.errorMessage}>{t('SIGN_UP_INFOR_ERROR')}</Text>
          )}
          <Controller
            control={control}
            rules={{
              maxLength: 16,
              minLength: 4,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={G.input}
                // TODO: refactor any type by andrew
                placeholder={t('ENTER_PASSWORD') as any}
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={true}
              />
            )}
            name="password"
          />
          <TouchableOpacity style={G.button} onPress={handleSubmit(onSubmit)}>
            <Text style={G.buttonText}>{t('LOGIN')}</Text>
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 30,
            }}
          >
            <Link to={{ screen: t('REGISTRATION_ACCOUNT') } as any}>
              {t('REGISTER')}
            </Link>
            <Link to={{ screen: t('ForgotPassword') } as any}>
              {t('FOGOT_PASSWORD')}
            </Link>
          </View>
        </View>
      </View>
      {responseOfData?.status === 200 && (
        <Toast
          visible={isSuccessMessage}
          position={50}
          duration={500}
          shadow={false}
          onShown={() =>
            setTimeout(() => {
              setIsSuccessMessage(false);
            }, 2000)
          }
          animation={true}
          style={{ marginTop: 10 }}
          backgroundColor={GREEN_COLOR}
          textColor={WHITE_COLOR}
        >
          {responseOfData.data.message}
        </Toast>
      )}
    </SafeAreaView>
  );
};

export default Login;
