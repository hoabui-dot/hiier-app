import { IJobNotification } from "../../types/ui";
import * as Notifications from 'expo-notifications';

export async function schedulePushNotification(notification: IJobNotification) {
  await Notifications.scheduleNotificationAsync(notification);
}

