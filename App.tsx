import React from 'react';
import { Platform } from "react-native";

import LoginScreens from './app/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from './app/screens/ForgotPassword';
import RegisterScreen from './app/screens/InformationRegistrationScreen';
import { Button } from 'react-native';
import Hiier from './app/screens/hiier';
import ResetPassword from './app/screens/ForgotPassword/ResetPassword';
import Toast from './components/ToastMessage';
import ConfirmOTP from './app/screens/ConfirmOTP';
import { PURPLE_COLOR, ROUTES, WHITE_COLOR } from './constants/ui';
import vi from './i18n/vi.json';
import en from './i18n/en.json';
import 'intl-pluralrules';

import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";

// Could be anything that returns default preferred language
import { getLocales } from "expo-localization";
import DrawerMenu from './app/screens/DrawerMenu';
import DetailInformation from './app/screens/DetailInformation';

const isAndroid = Platform.OS === "android";

if (isAndroid) {
  require("@formatjs/intl-locale/polyfill");

  require("@formatjs/intl-pluralrules/polyfill");
  require("@formatjs/intl-pluralrules/locale-data/vi");
  require("@formatjs/intl-pluralrules/locale-data/en");

  require("@formatjs/intl-displaynames/polyfill");
  require("@formatjs/intl-displaynames/locale-data/vi");
  require("@formatjs/intl-displaynames/locale-data/en");
}

const Stack = createNativeStackNavigator();
i18n.use(initReactI18next).init({
  // Add any imported languages here
  resources: {
    vi: {
      translation: vi,
    },
    en: {
      translation: en,
    }
  },
  lng: getLocales()[0].languageCode,
  fallbackLng: "en",  // This is the default language if none of the users preffered languages are available
  interpolation: {
    escapeValue: false, // https://www.i18next.com/translation-function/interpolation#unescape
  },
  returnNull: false,
});

const App = () => {
  const {t} = useTranslation();

  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        <Stack.Screen name={ROUTES.CONFIRM_OTP} component={ConfirmOTP}/>
        <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
        <Stack.Screen name={ROUTES.HIIER} options={{headerShown: false}} component={DrawerMenu} />
        <Stack.Screen name={ROUTES.RESET_PASSWORD} component={ResetPassword} />
        <Stack.Screen name={ROUTES.TOAST} component={Toast} />
        <Stack.Screen name={ROUTES.DETAIL_INFORMATION}  component={DetailInformation}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
