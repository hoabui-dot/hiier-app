import { Center, HStack, ITheme, useTheme } from 'native-base';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView
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

const ChatScreen = ({ route, navigation }: any) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  const [messages, setMessages] = useState<IMessageItem[]>([]);
  const [messInput, setMessInput] = useState<string>('');
  const [isSendMessage, setIsSendMessage] = useState<boolean>(false);

  // const isFocused = useIsFocused();
  useEffect(() => {
    const getMessage = async () => {
      const res = await MessageApi.getAll({id: route.params.id, page: 0, size: 20});
      setMessages(res.data?.resource?.messagePage?.list);
      setMessInput('');
    };
    getMessage();
  }, [isSendMessage, messages]);

  const onChangeInput = (value: string) => {
    setMessInput(value);
  };

  const submit = async () => {
    if (messInput) {
      try {
        const res = await MessageApi.create(route.params?.id, messInput);
        if (res.status === 200) {
          setMessInput('');
          setMessages([...messages, res.data?.resource])
          setIsSendMessage(true);
        } else {
          setIsSendMessage(false);
        }
      } catch (error) {
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
    <KeyboardAvoidingView style={styles.container}>
      <Header
        backButton
        headerText={route.params?.customerName}
        shadow={2}
        variant="light"
      />
      <FlatList
        style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 10 }}
        inverted
        data={messages}
        renderItem={({ item }) =>
          item.isYou ? (
            <View style={[styles.message, styles.rightMessage]}>
              <Text>{item.content}</Text>
            </View>
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
                <Text color="white">{item.content}</Text>
              </View>
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
            flexShrink={1}
            value={messInput}
            onChangeText={onChangeInput}
          />
          <TouchableOpacity onPress={submit}>
            <Center
              h={50}
              w={50}
              rounded={'full'}
              backgroundColor={'primary.charcoal'}
            >
              <Icon as={Icons.Send} color={'white'} />
            </Center>
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
      marginVertical: sizes.padding / 2,
      padding: sizes.padding,
      borderRadius: sizes.radius,
      maxWidth: sizes['4/5']
    },
    rightMessage: {
      backgroundColor: colors.primary.cream,
      alignSelf: 'flex-end',
    },
    leftMessage: {
      backgroundColor: colors.primary.charcoal,
      marginLeft: 10,
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
      paddingVertical: 8
    }
  });

export default ChatScreen;
