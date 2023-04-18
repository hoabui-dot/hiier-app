import { Platform } from 'react-native';

const isAndroid = Platform.OS === 'android';

if (isAndroid) {
  require('@formatjs/intl-locale/polyfill');

  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/locale-data/vi');
  require('@formatjs/intl-pluralrules/locale-data/en');

  require('@formatjs/intl-displaynames/polyfill');
  require('@formatjs/intl-displaynames/locale-data/vi');
  require('@formatjs/intl-displaynames/locale-data/en');
}

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Could be anything that returns default preferred language
import { getLocales } from 'expo-localization';

// Import all the languages you want here
import vi from './vi.json';
import en from './en.json';

i18n.use(initReactI18next).init({
  resources: {
    vi: vi,
    en: en,
  },
  lng: getLocales()[0].languageCode,
  fallbackLng: 'en', // This is the default language if none of the users preffered languages are available
  interpolation: {
    escapeValue: false, // https://www.i18next.com/translation-function/interpolation#unescape
  },
  returnNull: false,
});

export default i18n;