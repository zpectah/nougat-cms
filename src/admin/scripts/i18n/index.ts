import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { LANGUAGE } from '../const';
import resources from './resources';

i18n.use(initReactI18next).init({
    resources,
    defaultNS: 'common',
    lng: LANGUAGE.default,
    fallbackLng: LANGUAGE.list,
});
