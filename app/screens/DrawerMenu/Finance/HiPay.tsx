import {
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  Text,
  View,
  Button,
  Platform,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';
import Svg, { SvgXml } from 'react-native-svg';
import * as Device from 'expo-device';
import io from 'socket.io-client';
import Icons from '../../../../utils/Icon/Icons';
import * as Notifications from 'expo-notifications';
import { secretHashContext } from '../../DrawerMenu';
import { API_URL } from '../../../../services/api/urls';
import { IHiPay, IJobNotification } from '../../../../types/ui';
import {
  DEFAULT_HIPAY,
  jobNotificationMessage,
} from '../../../../constants/ui';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Card from '../../../../components/Card';
import { ITheme, useTheme, Icon, Modal, Center } from 'native-base';
import { TaskApi } from '../../../../services/api/task';
import ButtonBase from '../../../../components/Base/ButtonBase';
import InputBase from '../../../../components/Base/InputBase'

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });
const { width, height } = Dimensions.get('screen');

// async function schedulePushNotification(notification: IJobNotification) {
//   await Notifications.scheduleNotificationAsync(notification);
// }

export const hiPay = () => {
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const loginValue = useContext(secretHashContext);
  const socket = io(API_URL.webSocket);
  const Tab = createMaterialTopTabNavigator();
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);
  const [data, setData] = useState<IHiPay>(DEFAULT_HIPAY);
  const [isWithDrawModal, setIsWithDrawModal] = useState<boolean>(false);
  const [withDrawMoney, setWithDrawMoney] = useState<number>(0)
  console.log("🚀 ~ file: HiPay.tsx:64 ~ hiPay ~ withDrawMoney:", withDrawMoney)

  useEffect(() => {
    async function getWalletInfo() {
      await TaskApi.getWalletInfo()
        .then((response) => {
          console.log('🚀 ~ file: HiPay.tsx:57 ~ .then ~ response:', response);
          setData(response.data?.resource || []);
        })
        .catch((err) => console.log('errrrr: ', err));
    }

    getWalletInfo();
  }, []);

  // useEffect(() => {
  //   if (loginValue.secretHash) {
  //     socket.emit('subscribe-direct-notification', loginValue.secretHash);
  //     socket.on('subscribed/' + loginValue.secretHash, (response) => {
  //       console.log(
  //         '🚀 ~ file: index.tsx:43 ~ socket.on ~ response:',
  //         response
  //       );
  //     });
  //     socket.on('notification/' + loginValue.secretHash, () => {
  //       console.log('test notification');
  //       schedulePushNotification(jobNotificationMessage);
  //     });
  //   }
  // }, [socket]);

  // useEffect(() => {
  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  const onWithDraw = (value: number) => {

  };

  const WithDrawModal = ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: Dispatch<SetStateAction<boolean>>;
  }) => (
    <Modal style={{marginLeft: width / 5 * 0.5}} width={width / 5 * 4} isOpen={isOpen} onClose={onClose}>
      <Center>
        <Modal.Content width={width / 5 * 4}>
          <Modal.CloseButton />
          <Modal.Header>Rút tiền</Modal.Header>
          <Modal.Body>
              <InputBase placeholder='Nhập tiền' onChangeText={(value) => setWithDrawMoney(Number(value))}/>
          </Modal.Body>
          <Modal.Footer style={{justifyContent: 'space-between'}}>
            <ButtonBase
              title="Huỷ"  
              onPress={() => onClose(false)}
              containerStyle={styles.buttonModal}
            />
            <ButtonBase
              title="Xác nhận"
              onPress={() => onWithDraw(withDrawMoney)}
              containerStyle={styles.buttonModal}
            />
          </Modal.Footer>
        </Modal.Content>
      </Center>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Card cardStyle={styles.card}>
        <View style={styles.cardBody}>
          <View>
            <Text>Số tiền trong tài khoản</Text>
            <Text style={styles.money}>
              {data.balance.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })}
            </Text>
          </View>
          <View>
            <Image
              resizeMode="cover"
              style={{ width: 60, height: 60 }}
              source={require('../../../../assets/glass.png')}
            />
          </View>
        </View>
        <View style={styles.cardFooter}>
          <TouchableOpacity onPress={() => setIsWithDrawModal(true)}>
            <Text style={styles.rechargeTextButton}>Rút tiền</Text>
          </TouchableOpacity>
        </View>
      </Card>
      {/* <View style={styles.bankCard}>
        <View>
          <Icon as={Icons.Visa} size={8} />
        </View>
        <View>
          <Text>{data.bankNumber}</Text>
        </View>
        <View>
          <Text>{data.customerReceive}</Text>
        </View>
      </View> */}
      <WithDrawModal isOpen={isWithDrawModal} onClose={setIsWithDrawModal} />
    </SafeAreaView>
  );
};

export default hiPay;

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 10,
    },
    card: {
      marginTop: 10,
    },
    money: {
      color: colors.violet[400],
      fontWeight: '900',
      fontSize: 30,
    },
    rechargeTextButton: {
      fontWeight: '700',
      color: 'green',
      marginLeft: 'auto',
      marginTop: 10,
    },
    cardFooter: {
      borderTopWidth: 1,
      borderColor: '#ccc',
      marginTop: 14,
    },
    cardBody: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    bankCard: {
      justifyContent: 'space-between',
      marginTop: 14,
      borderRadius: 20,
      backgroundColor: colors.violet[400],
      height: height / 4,
      padding: 10,
    },
    buttonModal: {
      maxWidth: 100,
      height: 45,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
