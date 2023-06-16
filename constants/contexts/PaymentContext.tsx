import { ReactNode, createContext, useEffect, useState } from 'react';
import { IWallet } from '../../types/ui';
import { WalletApi } from '../../services/api/wallet';

interface PaymentContextProps {
  wallet: IWallet | null;
  setWallet: (value: IWallet | null) => void;
}

export const PaymentContext = createContext<PaymentContextProps>({
  wallet: null,
  setWallet: async () => {},
});

interface PaymentContextProviderProps {
  children: ReactNode;
  isLogged: boolean;
}

export const PaymentContextProvider = ({
  children,
  isLogged,
}: PaymentContextProviderProps) => {
  const [wallet, setWallet] = useState<IWallet | null>(null);

  useEffect(() => {
    if (isLogged) {
      const getWallet = async () => {
        try {
          const res = await WalletApi.getInfo();
          setWallet(res.resource);
          console.log(res.resource);
        } catch (error) {
          console.log(error);
          setWallet(null);
        }
      };
      getWallet();
    } else {
      setWallet(null);
    }
  }, [isLogged]);

  return (
    <PaymentContext.Provider value={{ wallet, setWallet }}>
      {children}
    </PaymentContext.Provider>
  );
};
