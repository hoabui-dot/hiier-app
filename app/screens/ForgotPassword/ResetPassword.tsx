import React, { useMemo, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import G from '../../../utils/GlobalStyles.styled';
import Header from '../../../components/Header';
import { ITheme, useTheme } from 'native-base';
import Constants from 'expo-constants';
import { GRAY_COLOR } from '../../../constants/ui';
import { TaskApi } from '../../../services/api/task';

export interface ResetPasswordProps {
  route: any;
  navigation: any;
}

const ResetPassword = ({ route, navigation }: ResetPasswordProps) => {
  const { isShowMessage, idHash } = route.params;
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async ({
    newPassword,
    confirmPassword,
  }: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (newPassword === confirmPassword) {
      TaskApi.resetPassword({
        idHash: idHash,
        newPassword: newPassword
      }).then(response => {
        navigation.navigate('Login');
      }).catch(err => {
        console.log('reset password:', err);
      })
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header headerText="ĐỔI MẬT KHẨU" backButton />
      <View style={styles.body}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={G.input}
              onBlur={onBlur}
              placeholder="Mật khẩu mới"
              placeholderTextColor={GRAY_COLOR}
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
          name="newPassword"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={G.input}
              onBlur={onBlur}
              placeholder="Xác nhận mật khẩu"
              placeholderTextColor={GRAY_COLOR}
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
          name="confirmPassword"
        />
        <TouchableOpacity style={G.button} onPress={handleSubmit(onSubmit)}>
          <Text style={G.buttonText}>Xác nhận</Text>
        </TouchableOpacity>
        {/* <Toast
        visible={isActive}
        position={100}
        duration={500}
        shadow={false}
        animation={true}
        onShown={() => {
          setTimeout(() => {
            setIsActive(false);
          }, 2000);
        }}
        textStyle={{ color: 'white', fontSize: 16 }}
        hideOnPress={true}
        backgroundColor="green"
      >
        SUCCESS !
      </Toast> */}
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;

const makeStyles = (args: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: -Constants.statusBarHeight,
    },
    body: {
      paddingHorizontal: 15,
      marginTop: 20
    }
  });
