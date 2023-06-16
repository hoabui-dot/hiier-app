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
  data: any;
  resource: any;
  message: string;
  status: number;
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

export interface ITaskHistory {
  addressCustomerName: string;
  addressCustomerPhone: string;
  addressDetail: string;
  addressNote: null;
  id: number;
  serviceKey: string;
  serviceName: string;
  taskStatus: {
    stateTus: string;
    time: number;
  };
  totalPrice: number;
}

export interface IJobNotification {
  content: {
    title: string;
    body: string;
    data?: { data: string };
  };
  trigger: { seconds: number };
}

export interface IHiPay {
  balance: number;
  bankName: string;
  bankNumber: number;
  customerReceive: string;
}

export interface ITransactionHistory {
  amount: number;
  content: string;
  time: number;
  status: string;
  type: ITransactionHistoryType;
}

export type Message = {
  avatar: string;
  content: string;
  fromId: number;
  groupChatId: number;
  id: number;
  isRead: boolean;
  isYou: string;
  name: string;
  time: string;
  messagePage: {
    list: IMessageItem[];
  };
};

export interface IMessageItem {
  id: number;
  content: string;
  isRead: boolean;
  isYou: boolean;
  time: Date;
}

export type GenderKey = 'MALE' | 'FEMALE';

export type Profile = {
  avatar: string;
  dob: string;
  fullName: string;
  gender: GenderKey;
  identifyNumber: string;
};

export type UserSession = {
  secretHash: string;
  token: string;
  profile: Profile;
};

export type IWallet = {
  id: number;
  balance: number;
  hiiPoint: number;
  bankNumber: string;
  bankName: string;
  customerReceive: string;
};

export type VerifyOTPParams = {
  idHash: string;
  otp: string | null;
};

export type CustomerRegisterParams = {
  password: string;
  email: string;
  phone: string;
  fullName: string;
  otp: string | null;
};

export type IPaymentMethod = {
  key: string;
  title: string;
  paymentMethod: PaymentMethodKey;
};

export type Transaction = {
  id: number;
  time: string;
  content: string;
  type: string;
  status: string;
  amount: number;
};

export interface IRegistrationAccount {
  fullName: string;
  password: string;
  phone: string;
  identifyNumber: string;
  gender: string;
}

export type PaymentMethodKey = 'COD' | 'MOMO' | 'VNPAY' | 'ZALOPAY';
export type ITransactionHistoryType = 'TOP_UP' | 'WITH_DRAW';
