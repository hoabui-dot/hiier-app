import React, { useState } from 'react';
import { Text, TextInput, View, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import G from '../../../utils/GlobalStyles.styled';

export interface ResetPasswordProps {
  route: any,
  navigation: any
}

const ResetPassword = ({ route, navigation }: ResetPasswordProps) => {
  const { isShowMessage } = route.params;
  const [isActive, setIsActive] = useState(isShowMessage || false);
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
      // setIsActive(true);
      // navigation.navigate('Login')
    }
  };

  return (
    <View style={G.container}>
      <Text style={G.paragraph}>Mật khẩu mới:</Text>
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
        name="newPassword"
      />
      <Text style={G.paragraph}>Xác nhận mật khẩu:</Text>
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
        name="confirmPassword"
      />
      <Pressable style={G.button} onPress={handleSubmit(onSubmit)}>
        <Text style={G.buttonText}>Đăng nhập</Text>
      </Pressable>
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
  );
};

export default ResetPassword;
