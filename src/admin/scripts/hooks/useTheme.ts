import { useDispatch, useSelector } from 'react-redux';

import { KEYS } from '../const';
import { storeProps, themeKeyType } from '../types';
import actions from '../store/actions';
import { lightTheme, darkTheme } from '../styles/theme';

const useTheme = () => {
    const { theme } = useSelector((store: storeProps) => store);
    const dispatch = useDispatch();
    const themes = {
        light: lightTheme,
        dark: darkTheme,
    };

    return {
        theme,
        setTheme: (theme: themeKeyType) => {
            localStorage.setItem(KEYS.APP_THEME, theme);
            dispatch(actions.themeToggle(theme));
        },
        themeObject: themes[theme],
    };
};

export default useTheme;
