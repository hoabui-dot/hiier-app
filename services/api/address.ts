import http from '../http';
import { Address, BaseResponse } from '../../types/ui';
import { API_URL } from './urls';

export const AddressApi = {
  create: async function (data: Address): Promise<BaseResponse> {
    return await http.post(API_URL.addressCreate, data);
  },
  list: async function (): Promise<BaseResponse> {
    return await http.get(API_URL.addressList);
  },
};
