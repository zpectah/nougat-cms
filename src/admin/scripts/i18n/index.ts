import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import config from '../config';
import resources from './resources';

i18n.use(initReactI18next).init({
    resources,
    defaultNS: 'common',
    lng: config.constants.CMS.languages.default,
    fallbackLng: config.constants.CMS.languages.list,
});
