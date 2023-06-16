import React, { useState } from 'react';
import Toast from 'react-native-root-toast';
import { Link } from '@react-navigation/native';
import Svg, { Image } from 'react-native-svg';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ILoginAccount } from '../../../types/ui';
import * as ExpoLocation from 'expo-location';
import { reverseGeocoding } from '../../../services/api/googleMapApi';

import { defaultLoginValue, ROUTES } from '../../../constants/ui';
import { USER_TYPE } from '../../../constants/ui';
import { WHITE_COLOR, GREEN_COLOR } from '../../../constants/ui';
import { Address } from '../../../types/ui';
import { initAddress } from '../../../utils/defaultValue/common';

import {
  Text,
  SafeAreaView,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { TaskApi } from '../../../services/api/task';

import S from './Login.styled';
import G from '../../../utils/GlobalStyles.styled';

export interface LoginProps {
  navigation: any;
}

const Login = ({ route, navigation }: any) => {
  console.log('🚀 ~ file: index.tsx:36 ~ Login ~ route:', route);
  // TODO: get default value by isoCode
  const [responseOfData, setResponseOfData] = useState<any>({});
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { control, handleSubmit } = useForm({
    defaultValues: defaultLoginValue,
  });
  const { t } = useTranslation();

  const { height } = Dimensions.get('window');

  const onSubmit = (value: ILoginAccount) => {
    TaskApi.login({
      phone: value.phone,
      password: value.password,
      role: USER_TYPE.EMPLOYEE,
    }).then(async (response: any) => {
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(status);
        return;
      }
      const location = await ExpoLocation.getCurrentPositionAsync({
        accuracy: ExpoLocation.Accuracy.Highest,
      });
      const res = await reverseGeocoding(location.coords);
      if (location && res) {
        setLocationLoading(false);
        const _address: Address = {
          ...initAddress,
          detail: res.formatted_address,
          location: location.coords,
        };
        navigation.navigate(ROUTES.HIIER, {
          secretHash: response?.data?.resource?.secretHash,
          token: response?.data?.resource?.token,
          address: _address,
        });
      }
      setIsSuccessMessage(true);
      setResponseOfData(response);
    }).catch(err => {
      setErrorMessage(err.errors.message)
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
          <Text style={S.title}>Dành cho Hiier</Text>
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
                  placeholder="Nhập số điện thoại"
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
            <Text style={G.errorMessage}>Đăng nhập thất bại</Text>
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
                placeholder={'Nhập mật khẩu'}
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={true}
              />
            )}
            name="password"
          />
          <Text style={{color: 'red'}}>{errorMessage}</Text>
          <TouchableOpacity style={G.button} onPress={handleSubmit(onSubmit)}>
            <Text style={G.buttonText}>Đăng nhập</Text>
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
              <Text>Đăng ký</Text>
            </Link>
            <Link to={{ screen: t('ForgotPassword') } as any}>
              <Text>Quên mật khẩu</Text>
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
          test
        </Toast>
      )}
      {route?.params?.isRegister ?? (
        <Toast
          position={100}
          duration={500}
          shadow={false}
          animation={true}
          textStyle={{ color: 'white', fontSize: 16 }}
          hideOnPress={true}
          style={{position: 'absolute', }}
          onShown={() => {
            setTimeout(() => {
            }, 2000);
          }}
          backgroundColor={GREEN_COLOR}
        >
          <Text>Đăng ký tài khoản thành công</Text>
        </Toast>
      )}
    </SafeAreaView>
  );
};

export default Login;
