import { createTheme } from '@mui/material';

import palette from './palette';

declare module '@mui/material/styles' {
    interface Theme { /* custom definitions */ }
    interface ThemeOptions { /* custom definitions */ }
}

const themeCommonProps = {
    shape: {
        borderRadius: 3,
    },
};
const paletteCommonProps = {
    primary: {
        main: palette.primary,
        contrastText: palette.white,
    },
    secondary: {
        main: palette.secondary,
        contrastText: palette.dark,
    },
};

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        ...paletteCommonProps,
    },
    ...themeCommonProps,
});
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        ...paletteCommonProps,
    },
    ...themeCommonProps,
});

export {
    lightTheme,
    darkTheme,
};