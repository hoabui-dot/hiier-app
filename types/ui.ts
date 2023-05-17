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
  id: string;
  address: string;
  duration: number;
  totalPrice: number;
  wageMoney: string;
  paymentMethod: string;
  customerName: string;
  phone: string;
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

export type AddressSearchResult = {
  placeId: string;
  description: string;
};
