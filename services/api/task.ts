// import { BaseResponse, Task } from '../../utils/types';
import http from '../http';
import { API_URL } from './urls';

export const TaskApi = {
  create: async function (data: any): Promise<any> {
    return await http.post(API_URL.taskCreate, data);
  },
  getAll: async function (): Promise<any> {
    return await http.get(API_URL.taskGetAll);
  },
  setActive: async function (location: any): Promise<any> {
    return await http.put(API_URL.setActive, location);
  },
  login: async function (account: any): Promise<any> {
    return await http.post(API_URL.login, account);
  },
  requestOTP: async function (phone: {phone: string}): Promise<any> {
    return await http.post(API_URL.otpRequest, phone);
  },
  verifyOTP: async function (phone: any): Promise<any> {
    return await http.post(API_URL.verifyOTP, phone);
  },
  forgotPassword: async function (value: any): Promise<any> {
    return await http.post(API_URL.requestForgotPassword, value);
  },
  getEmployeeInfo: async function (): Promise<any> {
    return await http.get(API_URL.employeeInfo);
  },
};