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
    typography: {
        h1: {
            fontSize: '2.25rem',
        },
        h2: {
            fontSize: '2rem',
        },
        h3: {
            fontSize: '1.75rem',
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: '700',
        },
        h5: {
            fontSize: '1.25rem',
        },
        h6: {
            fontSize: '1.1rem',
        },
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