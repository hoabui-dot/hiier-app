import React, { useContext, useEffect, useRef } from 'react';
import { Platform } from 'react-native';

import LoginScreens from './app/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from './app/screens/ForgotPassword';
import RegisterScreen from './app/screens/InformationRegistrationScreen';
import ResetPassword from './app/screens/ForgotPassword/ResetPassword';
import useCachedResources from './hooks/useCachedResources';
import { secretHashContext } from './app/screens/DrawerMenu';
import { jobNotificationMessage } from './constants/ui';
import { schedulePushNotification } from './utils/helpers/NotificationMessage';
import { API_URL } from './services/api/urls';
import Toast from './components/ToastMessage';
import io from 'socket.io-client';
import Map from './app/screens/Map';
import ConfirmOTP from './app/screens/ConfirmOTP';
import theme from './styles/theme';
import { PURPLE_COLOR, ROUTES, WHITE_COLOR } from './constants/ui';
import AddressSearch from './app/screens/AddressSearch';
import vi from './i18n/vi.json';
import en from './i18n/en.json';
import 'intl-pluralrules';

import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import * as Notifications from 'expo-notifications';

// Could be anything that returns default preferred language
import { getLocales } from 'expo-localization';
import DrawerMenu from './app/screens/DrawerMenu';
import DetailInformation from './app/screens/DetailInformation';
import { NativeBaseProvider } from 'native-base';
import { SplashScreen } from 'expo-router';
import messaging from '@react-native-firebase/messaging';

const isAndroid = Platform.OS === 'ios';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

if (isAndroid) {
  require('@formatjs/intl-locale/polyfill');

  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/locale-data/vi');
  require('@formatjs/intl-pluralrules/locale-data/en');

  require('@formatjs/intl-displaynames/polyfill');
  require('@formatjs/intl-displaynames/locale-data/vi');
  require('@formatjs/intl-displaynames/locale-data/en');
}

const Stack = createNativeStackNavigator();
i18n.use(initReactI18next).init({
  resources: {
    vi: {
      translation: vi,
    },
    en: {
      translation: en,
    },
  },
  lng: getLocales()[0].languageCode,
  fallbackLng: 'en', 
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

const App = () => {
  const { t } = useTranslation();

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Group>
            <Stack.Screen
              name="Login"
              component={LoginScreens}
              options={{ headerShown: false }}
            />
          </Stack.Group>
          <Stack.Screen
            name={t('REGISTRATION_ACCOUNT')}
            component={RegisterScreen}
            options={{
              headerStyle: { backgroundColor: PURPLE_COLOR },
              headerTitleStyle: {
                color: WHITE_COLOR,
              },
              headerTintColor: WHITE_COLOR,
            }}
          />
          <Stack.Screen name={ROUTES.CONFIRM_OTP} component={ConfirmOTP} />
          <Stack.Screen
            name={ROUTES.FORGOT_PASSWORD}
            component={ForgotPassword}
          />
          <Stack.Screen
            name={ROUTES.HIIER}
            options={{ headerShown: false }}
            component={DrawerMenu}
          />
          <Stack.Screen
            name={ROUTES.RESET_PASSWORD}
            component={ResetPassword}
          />
          <Stack.Screen name={ROUTES.TOAST} component={Toast} />
          <Stack.Screen
            name={ROUTES.DETAIL_INFORMATION}
            component={DetailInformation}
          />
          <Stack.Screen name={ROUTES.MAP} component={Map} />
          <Stack.Screen
            name={ROUTES.ADDRESS_SEARCH}
            component={AddressSearch}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default App;
