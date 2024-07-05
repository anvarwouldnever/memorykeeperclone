// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Функция для хранения и получения текущего языка из AsyncStorage
// const languageDetector = {
//   type: 'languageDetector',
//   async: true,
//   detect: async (callback) => {
//     const savedDataJSON = await AsyncStorage.getItem('user-language');
//     const lng = savedDataJSON ? savedDataJSON : 'en';
//     callback(lng);
//   },
//   init: () => {},
//   cacheUserLanguage: async (lng) => {
//     await AsyncStorage.setItem('user-language', lng);
//   },
// };

// i18n
//   .use(initReactI18next)
//   .use(languageDetector)
//   .init({
//     fallbackLng: 'en',
//     lng: 'en',
//     resources: {
//       en: {
//         translation: {
//           welcome: 'Welcome',
//           login: 'Login'
//         }
//       },
//       ru: {
//         translation: {
//           welcome: 'Добро пожаловать',
//           login: 'Вход'
//         }
//       }
//     },
//     interpolation: {
//       escapeValue: false,
//     }
//   });

// export default i18n;