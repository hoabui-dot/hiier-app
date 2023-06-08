export const BASEURL =
  'http://startupproject-env.eba-fp42mrnc.ap-southeast-1.elasticbeanstalk.com';

// export const BASEURL = 'https://bf85-14-186-123-80.ngrok-free.app'

const API_BASE = `${BASEURL}/api`;

export const API_URL = {
  webSocket:
    'ws://startupproject-env.eba-fp42mrnc.ap-southeast-1.elasticbeanstalk.com/cleaning-service',
  otpRequest: `${API_BASE}/account/request-otp/`,
  customerRegister: `${API_BASE}/account/customer-registration/`,
  login: `${API_BASE}/account/login/`,
  logout: `${API_BASE}/account/logout/`,
  checkToken: `${API_BASE}/account/check-token`,
  requestForgotPassword: `${API_BASE}/account/request-forget-password/`,
  resetPassword: `${API_BASE}/account/reset-password/`,
  verifyOTP: `${API_BASE}/account/verify-otp/`,
  profileView: `${API_BASE}/profile/view/`,
  profileUpdate: `${API_BASE}/profile/update/`,
  serviceGetAll: `${API_BASE}/service/get-all/`,
  voucherGetAll: `${API_BASE}/voucher/get-all/`,
  addressCreate: `${API_BASE}/address/create/`,
  addressList: `${API_BASE}/address/list`,
  taskCreate: `${API_BASE}/task/create`,
  // taskCreate: `${API_BASE}/task/payment/vnpay`,
  taskGetAll: `${API_BASE}/task/get-all/`,
  setActive: `${API_BASE}/account/set-active`,
  setInActive: `${API_BASE}/account/set-offline`,
  employeeInfo: `${API_BASE}/employee-profile/get/`,
  doneBooking: `${API_BASE}/task/done/`,
  cancelBooking: `${API_BASE}/task/cancel/`,
  JobHistory: `${API_BASE}/task/list-for-employee`,
  getWalletInfo: `${API_BASE}/wallet/get-info`,
  getTransactionHistory: `${API_BASE}/transaction-history/get-all`,
  onWithDraw: `${API_BASE}/wallet/with-draw`,
  notificationGetNew: `${API_BASE}/advertise/get-all/`,
  messageGetAll: `${API_BASE}/message/get-history-message/`,
  messageCreate: `${API_BASE}/message/create/`,
  getChatList: `${API_BASE}/group-chat/get-group-chat-by-user-login`
};
