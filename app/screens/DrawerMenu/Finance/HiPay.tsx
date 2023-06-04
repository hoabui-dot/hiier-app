import { useState, useEffect, useRef, useContext } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import io from 'socket.io-client';
import * as Notifications from 'expo-notifications';
import { secretHashContext } from '../../DrawerMenu';
import { API_URL } from '../../../../services/api/urls';
import { IJobNotification } from '../../../../types/ui';
import { jobNotificationMessage } from '../../../../constants/ui';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function schedulePushNotification(notification: IJobNotification) {
  await Notifications.scheduleNotificationAsync(notification);
}

export default function App() {
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const loginValue = useContext(secretHashContext);
  const socket = io(API_URL.webSocket);

  useEffect(() => {
    if (loginValue.secretHash) {
      socket.emit('subscribe-direct-notification', loginValue.secretHash);
      socket.on('subscribed/' + loginValue.secretHash, (response) => {
        console.log(
          '🚀 ~ file: index.tsx:43 ~ socket.on ~ response:',
          response
        );
      });
      socket.on('notification/' + loginValue.secretHash, () => {
        console.log('test notification');
        schedulePushNotification(jobNotificationMessage);
      });
    }
  }, [socket]);

  useEffect(() => {
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification({
            content: {
              title: "You've got mail! 📬",
              body: 'Here is the notification body',
              data: { data: 'goes here' },
            },
            trigger: { seconds: 1 },
          });
        }}
      />
    </View>
  );
}
