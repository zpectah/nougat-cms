import { useDispatch, useSelector } from 'react-redux';

import { KEYS } from '../const';
import { storeProps } from '../types';
import actions from '../store/actions';

const useLanguage = () => {
    const { language } = useSelector((store: storeProps) => store);
    const dispatch = useDispatch();

    return {
        language,
        setLanguage: (lang: string) => {
            localStorage.setItem(KEYS.APP_LANGUAGE, lang);
            dispatch(actions.languageToggle(lang));
        },
    };
};

export default useLanguage;
