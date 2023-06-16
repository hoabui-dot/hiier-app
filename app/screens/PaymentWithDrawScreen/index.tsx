import { Center, Flex, HStack, ITheme, useTheme } from 'native-base';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Linking,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import Input from '../../../components/Input';
import ViewCard from '../../../components/common/ViewCard';
import ViewBottom from '../../../components/ViewBottom';
import Heading from '../../../components/Heading';
import Header from '../../../components/Header';
import Text from '../../../components/Text';
import ButtonBase from '../../../components/Base/ButtonBase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { NumericFormat } from 'react-number-format';
import { WalletApi } from '../../../services/api/wallet';
import { PaymentContext } from '../../../constants/contexts/PaymentContext';
import { TaskApi } from '../../../services/api/task';

const PaymentTopUpScreen = ({ route, navigation }: any) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  const { setWallet, wallet } = useContext(PaymentContext);

  const [amount, setAmount] = useState<string>('');
  const [amountPrediction, setAmountPrediction] = useState<string[]>([
    '100000',
    '200000',
    '300000',
  ]);

  useEffect(() => {
    if (amount) {
      const _amount = Number(amount);
      const _amountPrediction = [];
      for (let index = 1; index <= 3; index++) {
        const _pre = _amount * Math.pow(10, index);
        if (_pre < 100000000) {
          _amountPrediction.push((_amount * Math.pow(10, index)).toString());
        }
      }
      setAmountPrediction(_amountPrediction);
    } else {
      setAmountPrediction(['100000', '200000', '300000']);
    }
  }, [amount]);

  const amountHandle = (val: string) => {
    setAmount(val.replace(/,|^0+/g, ''));
  };

  const handleTopUp = async () => {
    try {
      const res = await TaskApi.onWithDraw({money: Number(amount)});
      if (res) {
        Alert.alert('Rút thành công');
        console.log(res);
      }
    } catch (error) {
      // Alert.alert('Rút thành công');
      console.log(error);
    }
  };
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Header headerText={'Rút tiền'} backButton />
      <View style={styles.container}>
        <ViewCard style={{ paddingVertical: 20 }}>
          <HStack justifyContent={'space-between'} mb={3} px={2}>
            <Text>Balance</Text>
            <Heading>{wallet?.balance}</Heading>
          </HStack>
          <NumericFormat
            value={amount}
            displayType={'text'}
            thousandSeparator={true}
            renderText={(value: string) => (
              <Input
                value={value}
                onChangeText={amountHandle}
                keyboardType={'numeric'}
                InputRightElement={<Text mr={2}>VND</Text>}
              />
            )}
          />
        </ViewCard>
      </View>
      <ViewBottom>
        <HStack mb={2} space={2}>
          {amountPrediction?.map((it, id) => (
            <Center flex={1} key={id}>
              <TouchableOpacity style={styles.prediction}>
                <NumericFormat
                  value={it}
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={(value: string) => (
                    <Text
                      textAlign={'center'}
                      onPress={() => amountHandle(value)}
                    >
                      {value}
                    </Text>
                  )}
                />
              </TouchableOpacity>
            </Center>
          ))}
        </HStack>
        <ButtonBase
          title="Xác nhận"
          onPress={() => handleTopUp()}
          variant={'solid'}
        />
      </ViewBottom>
    </KeyboardAwareScrollView>
  );
};

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },

    amountItemWrap: {
      width: sizes['1/3'],
      padding: sizes.padding / 2,
    },
    amountItem: {
      borderRadius: sizes.radius,
      backgroundColor: colors.white,
      borderColor: colors.violet['400'],
      borderWidth: 1,
      paddingHorizontal: sizes.padding,
      paddingVertical: sizes.padding * 2,
    },
    text: {
      fontSize: fontSizes.sm,
      fontWeight: '400',
      lineHeight: fontSizes.sm * 1.5,
    },
    heading: {
      fontSize: fontSizes.md,
      fontWeight: '500',
      lineHeight: fontSizes.sm * 1.5,
    },

    prediction: {
      width: sizes.full,
      backgroundColor: colors.gray['100'],
      padding: sizes.padding / 2,
      borderRadius: sizes.radius / 2,
    },
  });

export default PaymentTopUpScreen;
