/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { LatLng } from 'react-native-maps';

export type CustomerRegisterParams = {
  password: string;
  email: string;
  phone: string;
  fullName: string;
  otp: string | null;
};

export type Address = {
  id: number;
  customerName: string;
  note: string;
  phone: string;
  detail: string;
  location: LatLng;
};

export type PaymentMethod = {
  key: string;
  title: string;
  paymentMethod: PaymentMethodKey;
};

export type PaymentMethodKey = 'COD' | 'MOMO' | 'VNPAY' | 'ZALOPAY';

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
  Login: undefined;
  Register: undefined;
  OTP: CustomerRegisterParams | VerifyOTPParams;
  ForgotPassword: undefined;
  Splash: undefined;
  UpdateProfile: undefined;
  ResetPassword: VerifyOTPParams;
  OrderService: Service;
  OrderTimeAddress: Address | undefined;
  OrderPreview: PaymentMethod | undefined;
  Map: Address;
  AddressList: undefined;
  AddressSearch: { placeDetail: string } | undefined;
  Voucher: undefined;
  PaymentMethod: undefined;
  PaymentWaiting: { payUrl: string };
  PaymentSuccess: undefined;
  TaskDetail: { id: number };
  // GoogleMap: undefined;
};

export type MainTabsParamList = {
  Home: undefined;
  Activity: undefined;
  Message: undefined;
  User: undefined;
  // Scan: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type MainTabsProps<T extends keyof MainTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabsParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type VerifyOTPParams = {
  idHash: string;
  otp: string | null;
};

export type Service = {
  id: number;
  name: string;
  description: string;
  key: string;
  addOnServices: AddOnService[];
  servicePrices: ServicePrice[];
};

export type AddOnService = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export type ServicePrice = {
  id: number;
  time: number;
  wage_money: number;
  area: number;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}