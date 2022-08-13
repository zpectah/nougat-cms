import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';

import routes from '../../routes';
import {
    useTheme,
    useSidebar,
    useMeta,
} from '../../hooks';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { Toasts } from '../Toasts';
import {
    Error404View,
    DashboardView,
    SettingsView,
    ProfileView,
    LoginView,
    LostPasswordView,
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
            <ErrorBoundary>
                <BrowserRouter>
                    <Routes>
                        <Route path={routes.Dashboard.match} element={<DashboardView />} />
                        <Route path={routes.Settings.match} element={<SettingsView />} />
                        <Route path={routes.Profile.match} element={<ProfileView />} />
                        <Route path={routes.Login.match} element={<LoginView />} />
                        <Route path={routes.LostPassword.match} element={<LostPasswordView />} />
                        <Route path={routes.Error404.match} element={<Error404View />} />
                    </Routes>
                </BrowserRouter>
                <Toasts />
            </ErrorBoundary>
        </ThemeProvider>
    );
};

export default App;
