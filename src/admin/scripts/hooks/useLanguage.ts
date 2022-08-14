import { useDispatch, useSelector } from 'react-redux';

import config from '../config';
import { KEYS } from '../const';
import { storeProps } from '../types';
import actions from '../store/actions';

const useLanguage = () => {
    const { language } = useSelector((store: storeProps) => store);
    const dispatch = useDispatch();

    const locales = config.locales;

    const setLanguage = (lang: string) => {
        localStorage.setItem(KEYS.APP_LANGUAGE, lang);
        dispatch(actions.languageToggle(lang));
    };

    return {
        language,
        setLanguage,
        locales,
        locale: locales[language],
        languagesList: config.constants.CMS.languages.list as string[],
    };
};

export default useLanguage;
