export const BLACK_COLOR = '#000';
export const WHITE_COLOR = 'white';
export const GREEN_COLOR = 'green';
export const RED_COLOR = 'red';
export const GRAY_COLOR = '#ccc';
export const PURPLE_COLOR = 'rgba(123,104,238,0.8)';
export const PINK_COLOR = '#F4B9C1';

export const defaultLoginValue = {
  phone: '',
  password: '',
  role: '',
};

export const COUNTRY = [
  {
    label: 'Tiếng Việt',
    isoCode: 'vi',
    flat: '🇻🇳',
    phoneCode: '+84',
  },
  {
    label: 'English',
    isoCode: 'en',
    flat: '🇬🇧',
  },
];

export const IMAGE = '../assets/hi_logo.png';

export const ROUTES = {
  CONFIRM_OTP: 'ConfirmOTP',
  FORGOT_PASSWORD: 'ForgotPassword',
  HIIER: 'Hiier',
  RESET_PASSWORD: 'ResetPassword',
  NOTIFICATION: 'Notification',
  FINANCE: 'Finance',
  FRIEND_CODE: 'Friend code',
  SUPPORT: 'Support',
  GENERAL: 'General',
  DETAIL_INFORMATION: 'DetailInformation',
  TOAST: 'Toast',
  MAP: 'Map',
  ADDRESS_SEARCH: 'AddressSearch',
};

export const DRAWER = {
  HIIER: 'Hiier',
  NOTIFICATION: 'Thông báo từ Hiier',
  TRAINING: 'Chương trình đào tạo',
  FINANCE: 'Tài chính',
  JOB_HISTORY: 'Lịch sử làm viêc',
  SUPPORTING: 'Hỗ trợ',
  FRIEND_CODE: 'Mã giới thiệu bạn bè',
};

export const JOB_TAB = {
  NEW: 'Chờ việc',
  CONFIRMED: 'Đã nhận',
};

export const JOB_HISTORY_TAB = {
  DONE: 'Hoàn thành việc',
  CANCELED: 'huỷ việc',
};

export const FINANCE_TAB = {
  HI_BAY: 'HiPay',
  TRADING: 'Giao dịch',
};

export const USER_TYPE = {
  EMPLOYEE: 'EMPLOYEE',
};

export const USER_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
};

export const GOOGLE_API_KEY = `AIzaSyDzzi_VBcf2Oef6LTViLU767UPNHlnIze4`;

export const TASK_STATUS = {
  DONE: 'done',
  CANCELED: 'canceled',
  PENDING: 'pending',
};

export const JOB_NOTIFICATION = {
  content: {
    title: 'Công việc mới! 📬',
    body: '',
  },
  trigger: { seconds: 2 },
};

export const jobNotificationMessage = {
  content: {
    title: 'Công việc mới 📬',
    body: 'Nhanh nhanh vào ứng dụng để xem công việc mới nào Hiier ơi 📬',
    data: { data: '' },
  },
  trigger: { seconds: 1 },
};
