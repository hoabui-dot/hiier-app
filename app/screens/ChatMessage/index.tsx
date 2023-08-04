import { Center, HStack, ITheme, useTheme } from 'native-base';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ViewBottom from '../../../components/ViewBottom';
import Input from '../../../components/Input';
import Header from '../../../components/Header';
import { IMessageItem } from '../../../types/ui';
import Text from '../../../components/Text';
import Icon from '../../../utils/Icon/Icon';
import Icons from '../../../utils/Icon/Icons';
import { useSocket } from '../../../constants/contexts/SocketContext';
import { MessageApi } from '../../../services/api/message';
import SecureStoreHelper from '../../../utils/secureStore';
import notification from '../../../utils/notification';
import {
  GRAY_COLOR,
  PURPLE_COLOR,
  PURPLE_GRADIENT_CENTER,
  PURPLE_GRADIENT_END,
  PURPLE_GRADIENT_START,
  WHITE_COLOR,
} from '../../../constants/ui';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('screen');

const ChatScreen = ({ route, navigation }: any) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  const [messages, setMessages] = useState<IMessageItem[]>([]);
  const [messInput, setMessInput] = useState<string>('');
  const [isSendMessage, setIsSendMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const isFocused = useIsFocused();
  useEffect(() => {
    const getMessage = async () => {
      const res = await MessageApi.getAll({
        id: route.params.id,
        page: 0,
        size: 20,
      });
      setMessages(res.data?.resource?.messagePage?.list);
      setMessInput('');
      setIsSendMessage(false);
    };
    getMessage();
  }, [isSendMessage]);

  const onChangeInput = (value: string) => {
    setMessInput(value);
  };

  const onSendingMessage = async () => {
    setIsLoading(true);
    if (messInput) {
      try {
        const res = await MessageApi.create(route.params?.id, messInput);
        if (res.status === 200) {
          setMessInput('');
          setMessages([...messages, res.data?.resource]);
          setIsSendMessage(true);
        } else {
          setIsSendMessage(false);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    } else {
      Alert.alert('Enter your message');
    }
  };

  const socket = useSocket();
  useEffect(() => {
    const initSocket = async () => {
      const secretHash = await SecureStoreHelper.getUserSecretHash();
      // socket.emit('subscribe-direct-notification', secretHash);
      socket.on(`message-receive/${route.params?.id}/${secretHash}`, (res) => {
        console.log('notification', res);
        notification.schedulePushNotification(res);
      });
    };
    initSocket();
  }, [socket]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Header backButton headerText={route.params?.customerName} shadow={2} />
      <FlatList
        style={{
          flex: 1,
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: WHITE_COLOR,
        }}
        inverted
        data={messages}
        renderItem={({ item }) =>
          item.isYou ? (
            <LinearGradient
              style={[styles.message, styles.rightMessage]}
              colors={[
                PURPLE_GRADIENT_START,
                PURPLE_GRADIENT_CENTER,
                PURPLE_GRADIENT_END,
              ]}
              start={{ x: 0, y: 1 }}
            >
              <Text color="white">{item.content}</Text>
              <Text
                style={[styles.sendingTime, styles.sendingTime_right]}
                color="white"
              >{`${new Date(item.time).getHours()}:${new Date(
                item.time
              ).getMinutes()}`}</Text>
            </LinearGradient>
          ) : (
            <View style={styles.wrapMessage}>
              <Image
                style={styles.userImage}
                source={{
                  uri: route.params?.avatar
                    ? route.params?.avatar
                    : 'https://assets.capitalfm.com/2017/43/taylor-swift-1508765921.jpg',
                }}
              />
              <View style={[styles.message, styles.leftMessage]}>
                <Text
                  style={[styles.sendingTime, styles.sendingTime_left]}
                >{`${new Date(item.time).getHours()}:${new Date(
                  item.time
                ).getMinutes()}`}</Text>
                <Text style={{ textAlign: 'right' }}>{item.content}</Text>
              </View>
              <View style={styles.container}></View>
            </View>
          )
        }
        keyExtractor={(it, id) => id.toString()}
      />
      <ViewBottom>
        <HStack
          justifyContent={'space-between'}
          alignItems={'center'}
          space={2}
        >
          <Input
            placeholder='Tin nhắn ...'
            flexShrink={1}
            value={messInput}
            onChangeText={onChangeInput}
          />
          <TouchableOpacity onPress={onSendingMessage}>
            <LinearGradient
              style={{ borderRadius: 30 }}
              colors={isLoading ? [GRAY_COLOR] : [
                PURPLE_GRADIENT_START,
                PURPLE_GRADIENT_CENTER,
                PURPLE_GRADIENT_END,
              ]}
            >
              <Center h={50} w={50} rounded={'full'}>
                <Icon as={Icons.Send} color={'white'} />
              </Center>
            </LinearGradient>
          </TouchableOpacity>
        </HStack>
      </ViewBottom>
    </KeyboardAvoidingView>
  );
};

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      paddingVertical: sizes.padding2,
      marginTop: 0,
      backgroundColor: colors.white,
    },
    itemInner: {
      paddingVertical: sizes.padding2,
      borderColor: colors.gray[300],
      borderStyle: 'dashed',
      borderBottomWidth: 1,
    },
    img: {
      aspectRatio: 1,
      width: 70,
      borderRadius: sizes.radius / 2,
    },
    time: {},
    textWrap: {
      // paddingVertical: sizes.padding / 2,
    },

    message: {
      position: 'relative',
      marginVertical: sizes.padding / 2,
      paddingHorizontal: sizes.padding2,
      paddingTop: sizes.paddingBasic,
      paddingBottom: sizes.padding2,
      borderRadius: 12,
      maxWidth: (width / 5) * 4,
      minWidth: (width / 5) * 1.5,
    },
    rightMessage: {
      alignSelf: 'flex-end',
      borderTopRightRadius: 0,
    },
    leftMessage: {
      backgroundColor: colors.secondary[100],
      marginLeft: 10,
      borderTopLeftRadius: 0,
    },
    userImage: {
      width: 40,
      height: 40,
      borderRadius: 30,
      position: 'relative',
      zIndex: 100,
      // left: width / 2 - 110,
      bottom: -5,
    },
    wrapMessage: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
    },
    sendingTime: {
      position: 'absolute',
      bottom: -2,
      fontSize: 12,
      color: GRAY_COLOR,
    },
    sendingTime_right: {
      right: 10,
    },
    sendingTime_left: {
      left: 10,
    },
  });

export default ChatScreen;
