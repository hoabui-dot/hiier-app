import http from '../http';
import { BaseResponse } from '../../types/api';
import { API_URL } from './urls';

export const NotificationApi = {
  getNewNotification: async function (): Promise<BaseResponse> {
    return await http.get(API_URL.notificationGetNew);
  },
};

