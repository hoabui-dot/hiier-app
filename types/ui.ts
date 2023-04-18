export interface IDropdownData {
  label: string;
  flat: string;
  isoCode: string;
  phoneCode?: string;
}

export interface ILoginAccount {
  phone: string;
  password: string;
  role: string
}

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