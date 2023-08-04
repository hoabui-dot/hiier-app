export const BLACK_COLOR = '#000';
export const WHITE_COLOR = 'white';
export const GREEN_COLOR = 'green';
export const RED_COLOR = 'red';
export const GOLD_COLOR = '#D6AD60'
export const GRAY_COLOR = '#9E9E9E';
export const PURPLE_COLOR = '#683DB4';
export const PINK_COLOR = '#F4B9C1';
export const LIGHT_GRAY_COLOR = '#F9F9F9'
export const PLACE_HOLDER_TEXT_COLOR = '#949494';
export const LIGHT_PURPLE_COLOR = '#EFE7FD';
export const PURPLE_GRADIENT_START = "#8B4EF9";
export const PURPLE_GRADIENT_CENTER = "#7B3AF9";
export const PURPLE_GRADIENT_END = "#6829F8";

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
  CONFIRM_OTP: 'RegistrationOTP',
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
  CHAT_MESSAGE: "ChatMessage",
  PAYMENT: 'Payment',
  PAYMENT_WITH_DRAW: 'WithDraw',
  LOGIN: "Login",
  CONFIRM_FORGOT_PASSWORD_OTP: 'ForgotPasswordOTP'
};

export const DRAWER = {
  JOB: 'Job',
  NOTIFICATION: 'Thông báo từ Hiier',
  TRAINING: 'Chương trình đào tạo',
  FINANCE: 'Tài chính',
  JOB_HISTORY: 'Lịch sử làm viêc',
  SUPPORTING: 'Hỗ trợ',
  FRIEND_CODE: 'Mã giới thiệu bạn bè',
  TOOLS: "Công cụ làm việc"
};

export const TOOLS = {
  TOOL: 'Công cụ',
  CHEMICAL: 'Hoá học'
}

export const JOB_TAB = {
  NEW: 'Chờ việc',
  CONFIRMED: 'Đã nhận',
  CALENDAR: "Lịch làm việc"
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

export const DEFAULT_HIPAY = {
  balance: 0,
  bankName: '',
  bankNumber: 0,
  customerReceive: '',
}

export const TRANSACTION_HISTORY_TYPE = {
  TOP_UP: "TOP_UP",
  WITH_DRAW: "WITH_DRAW"
}

export const USER_SESSION = 'user_session';

export const DEFAULT_QUIZZES = {
  name: '',
  numberAnswerPassed: '',
  qadtoList: [],
}

export const DEFAULT_CHARACTER = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
]

export const FOCUS_INPUT_WHEN_USER_LOGIN = {
  PHONE: 'PHONE',
  PASSWORD: 'PASSWORD',
}

export const FOCUS_INPUT_WITH_REGISTRATION = {
  NAME: 'NAME',
  PASSWORD: 'PASSWORD',
  IDENTIFY: 'IDENTIFY',
  PHONE: 'PHONE'
}

export const ONE_MINUTE = 60;

export const RESET_PASSWORD_VALUE = {
  NEW_PASSWORD: 'NEW_PASSWORD',
  CONFIRM_PASSWORD: 'CONFIRM_PASSWORD',
}
