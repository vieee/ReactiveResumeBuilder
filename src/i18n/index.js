import i18n from 'i18next';
import backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';

import resources from './locales';

const languages = [
  {
    code: 'en',
    name: 'English (US)',
  },
  {
    code: 'hi',
    name: 'Hindi (हिन्दी)',
  }
];

i18n
  .use(detector)
  .use(backend)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    ns: ['app', 'leftSidebar', 'rightSidebar'],
    defaultNS: 'app',
  });

export { languages };

export default i18n;