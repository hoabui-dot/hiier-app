import { createContext, ReactNode, useContext } from 'react';
import io from 'socket.io-client';
import { API_URL } from '../../services/api/urls';

export const socket = io(API_URL.webSocket);

export const SocketContext = createContext(socket);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
