import React from 'react';
import {
    useNavigate,
    useMatch,
    useResolvedPath,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';

import { useBreadcrumbs, useRoutes } from '../../../../hooks';

const Navbar = () => {
    const { t } = useTranslation('views');
    const navigate = useNavigate();
    const { page } = useBreadcrumbs();
    const { routes } = useRoutes();

    const navItems = [
        {
            key: routes.Dashboard.key,
            label: t('Dashboard.label'),
            path: routes.Dashboard.path,
            disabled: false,
            active: true,
        },
        {
            key: routes.Settings.key,
            label: t('Settings.label'),
            path: routes.Settings.path,
            disabled: false,
            active: true,
        },

        {
            key: routes.Profile.key,
            label: t('Profile.label'),
            path: routes.Profile.path,
            disabled: false,
            active: true,
        },

        {
            key: routes.Login.key,
            label: t('Login.label'),
            path: routes.Login.path,
            disabled: false,
            active: true,
        },
        {
            key: routes.LostPassword.key,
            label: t('LostPassword.label'),
            path: routes.LostPassword.path,
            disabled: false,
            active: true,
        },

        {
            key: routes.Error404.key,
            label: 'Error404',
            path: '/admin/dkfjhgkdjf',
            disabled: false,
            active: true,
        },
    ];

    const linkHandler = (path: string) => navigate(path);

    const linkSelected = (path: string, key: string) => {
        const resolved = useResolvedPath(path);
        const matched = useMatch({ path: resolved.pathname, end: true });

        return !!matched || page === key;
    };

    return (
        <Box
            sx={{
                py: 1,
                px: 1,
            }}
        >
            <nav aria-label="main navigation">
                <List>
                    {navItems.map((item) => {
                        if (item.active) return (
                            <ListItem
                                key={item.key}
                                disablePadding
                            >
                                <ListItemButton
                                    selected={linkSelected(item.path as string, item.key)}
                                    disabled={item.disabled}
                                    onClick={() => linkHandler(item.path as string)}
                                >
                                    <ListItemText
                                        primary={item.label}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </nav>
        </Box>
    );
};

export default Navbar;
