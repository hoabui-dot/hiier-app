// import { BaseResponse } from '../../utils/types';
import { BaseResponse } from '../../types/api';
import http from '../http';
import { API_URL } from './urls';

export const WalletApi = {
  getInfo: async function (): Promise<BaseResponse> {
    return await http.get(API_URL.getWalletInfo);
  },
  withDraw: async function (data: number): Promise<BaseResponse> {
    return await http.put(API_URL.onWithDraw, { money: data });
  },
};
