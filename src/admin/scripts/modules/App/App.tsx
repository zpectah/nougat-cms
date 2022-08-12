import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';

import {
    useTheme,
    useSidebar,
    useMeta,
} from '../../hooks';
import { Toasts } from '../Toasts';
import {
    Error404View,
    DashboardView,
} from '../../views';

const App = () => {
    const { themeObject } = useTheme();
    const { sidebarInit } = useSidebar();
    const { loadMeta } = useMeta();

    useEffect(() => {
        sidebarInit();
        loadMeta();

    }, []);

    return (
        <ThemeProvider theme={themeObject}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/admin/" element={<DashboardView />} />
                    <Route path="*" element={<Error404View />} />
                </Routes>
            </BrowserRouter>
            <Toasts />
        </ThemeProvider>
    );
};

export default App;
