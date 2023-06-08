import * as SecureStore from 'expo-secure-store';
import { USER_SESSION } from '../constants/ui';
import { UserSession } from '../types/ui';

const SecureStoreHelper = {
  setUserSession: async (data: UserSession) => {
    try {
      const res = await SecureStore.setItemAsync(
        USER_SESSION,
        JSON.stringify(data)
      );

      // Congrats! You've just stored your first value!
    } catch (err) {
      // There was an error on the native side
      console.log(err);
    }
  },
  getUserSession: async () => {
    try {
      const session = await SecureStore.getItemAsync('user_session');

      if (session) {
        // Congrats! You've just retrieved your first value!
        // console.log(JSON.parse(session));
        return JSON.parse(session);
      }
      return session;
    } catch (err) {
      // There was an error on the native side
      console.log(err);
    }
  },
  deleteUserSession: async () => {
    try {
      await SecureStore.deleteItemAsync('user_session');
      // Congrats! You've just removed your first value!
    } catch (err) {
      // There was an error on the native side
      console.log(err);
    }
  },
  getUserToken: async () => {
    try {
      const session = await SecureStore.getItemAsync('user_session');

      if (session) {
        // Congrats! You've just retrieved your first value!
        // console.log(JSON.parse(session));
        return JSON.parse(session).token;
      }
      return session;
    } catch (err) {
      // There was an error on the native side
      console.log(err);
    }
  },
  getUserSecretHash: async () => {
    try {
      const session = await SecureStore.getItemAsync('user_session');

      if (session) {
        // Congrats! You've just retrieved your first value!
        // console.log(JSON.parse(session));
        return JSON.parse(session).secretHash;
      }
      return session;
    } catch (err) {
      // There was an error on the native side
      console.log(err);
    }
  },
};

export default SecureStoreHelper;
