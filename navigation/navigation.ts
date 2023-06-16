/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
// import type {StackScreenProps} from '@react-navigation/stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  VerifyOTPParams,
  CustomerRegisterParams,
  IPaymentMethod,
  Address,
} from '../types/ui';

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
  Login: undefined;
  Register: undefined;
  OTP: CustomerRegisterParams | VerifyOTPParams;
  ForgotPassword: undefined;
  Splash: undefined;
  UpdateProfile: undefined;
  ResetPassword: VerifyOTPParams;
  OrderService: { idOrAddress: number | Address };
  OrderPreview: IPaymentMethod | undefined;
  Map: Address;
  AddressList: undefined;
  AddressSearch: { placeDetail: string } | undefined;
  Voucher: undefined;
  VoucherDetail: { id: number };
  Payment: undefined;
  IPaymentMethod: undefined;
  PaymentWaiting: { payUrl: string };
  PaymentSuccess: undefined;
  PaymentTopUp: undefined;
  Point: undefined;
  TaskDetail: { id: number };
  MessageChat: undefined;
  Chat: { id: number };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type MainTabsParamList = {
  Home: undefined;
  Activity: undefined;
  Shortcut: undefined;
  Message: undefined;
  User: undefined;
};

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
