import { LatLng } from 'react-native-maps';

export interface IDropdownData {
  label: string;
  flat: string;
  isoCode: string;
  phoneCode?: string;
}

export interface ILoginAccount {
  phone: string;
  password: string;
  role: string;
}

export type BaseResponse = {
  resource: any;
  message: string;
};

export interface IJobInformation {
  id: number;
  customerName: string;
  customerPhone: string;
  equipment: string;
  address: {
    detail: string;
    customerName: string;
    phone: string;
  };
  paymentMethod: string;
  taskName: string; //công việc
  totalPrice: number; //tổng tiền
  tipMoney: number; 
  overtimePrice: number; //phí làm việc ngoài giờ
  duration: number;
}

export interface IDetailHiierInformation {
  avatar: string;
  avgRating: number;
  identityNumber: string;
  name: string;
  phone: string;
  level: number;
  virtualMoney: number;
  isPremium: number;
}

export type Address = {
  id: number;
  customerName: string;
  note: string;
  phone: string;
  detail: string;
  location: LatLng;
};

export interface IDoneTaskHistory {
  serviceName: string;
  totalPrice: number;
  finishTime: number;
  address: {
    customerName: string;
    detail: string;
  }
}

export interface ICanceledTaskHistory {
  serviceName: string;
  totalPrice: number;
  canceledTime: number;
  address: {
    customerName: string;
    detail: string;
  }
}

export interface IJobNotification {
  content: {
    title: string;
    body: string;
    data?: {data: string},
  };
  trigger: {seconds:  number};
}
