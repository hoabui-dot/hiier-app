import messaging from '@react-native-firebase/messaging';
import notification from './notification';
// import * as SecureStore from 'expo-secure-store';

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

const getDeviceToken = async () => {
  try {
    const fcmToken = await messaging().getToken();``
    if (fcmToken) {
      // user has a device token
      console.log(fcmToken);
      // await SecureStore.setItemAsync('fcmToken', fcmToken);
      return Promise.resolve(fcmToken);
    }
  } catch (err) {
    console.log(err);
  }

  // user doesn't have a device token yet
  return Promise.reject(null);
};

const getInitialNotification = async () =>
  messaging()
    .getInitialNotification()
    .then((remoteMessage: any) => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification
        );
      }
      notification.schedulePushNotification(remoteMessage);
    });

const onNotificationOpenedApp = () =>
  messaging().onNotificationOpenedApp(async (remoteMessage: any) => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification
    );
    await notification.schedulePushNotification(remoteMessage);
  });

const setBackgroundMessageHandler = () =>
  messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
    console.log('Message handled in the background!', remoteMessage);
    await notification.schedulePushNotification(remoteMessage);
  });

const onMessage = () =>
  messaging().onMessage(async (remoteMessage: any) => {
    console.log('Message handled in the app state!', remoteMessage);
    await notification.schedulePushNotification(remoteMessage);
  });

export const firebasePushSetup = async () => {
  try {
    const token = await messaging().getToken();
    console.log('TOKEN =', token);
    const granted = await messaging().requestPermission();
    console.log('GRANTED =', granted);
    //Bg use in index.js
    // messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    //   console.log('Message handled in the background!', remoteMessage);
    // });
    if (token && granted) {
      const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
        console.log('FCM Message Data:', remoteMessage.data);
        await notification.schedulePushNotification(remoteMessage);
      });
      return unsubscribe;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default {
  getDeviceToken,
  requestUserPermission,
  onMessage,
  setBackgroundMessageHandler,
  onNotificationOpenedApp,
  getInitialNotification,
  firebasePushSetup,
};
