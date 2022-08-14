import { useDispatch, useSelector } from 'react-redux';

import { KEYS } from '../const';
import { Themes } from '../enums';
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

    const setTheme = (theme: themeKeyType) => {
        localStorage.setItem(KEYS.APP_THEME, theme);
        dispatch(actions.setTheme(theme));
    };
    const toggleTheme = () => {
        let t: themeKeyType;
        if (theme === Themes['light']) {
            t = Themes['dark'];
        } else {
            t = Themes['light'];
        }
        setTheme(t);
    };

    return {
        theme,
        setTheme,
        toggleTheme,
        themeObject: themes[theme],
    };
};

export default useTheme;
