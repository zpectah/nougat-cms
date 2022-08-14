import React from 'react';
import { isMobile } from 'react-device-detect';
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
    ListItemIcon,
    SvgIconProps,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
// import CategoryIcon from '@mui/icons-material/Category';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
// import MenuIcon from '@mui/icons-material/Menu';
// import AutoStoriesIcon from '@mui/icons-material/AutoStories';
// import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
// import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
// import LanguageIcon from '@mui/icons-material/Language';
// import MessageIcon from '@mui/icons-material/Message';

import {
    useBreadcrumbs,
    useRoutes,
    useSidebar,
} from '../../../../hooks';

const Navbar = () => {
    const { t } = useTranslation('views');
    const navigate = useNavigate();
    const { page } = useBreadcrumbs();
    const { routes } = useRoutes();
    const { toggleSidebar } = useSidebar();

    const iconProps: SvgIconProps = {
        fontSize: 'small',
        color: 'inherit',
    };
    const navItems = [
        {
            key: routes.Dashboard.key,
            label: t('Dashboard.label'),
            path: routes.Dashboard.path,
            disabled: false,
            active: true,
            icon: <HomeIcon {...iconProps} />,
        },
        {
            key: routes.Settings.key,
            label: t('Settings.label'),
            path: routes.Settings.path,
            disabled: false,
            active: true,
            icon: <SettingsIcon {...iconProps} />,
        },
        {
            key: routes.Users.key,
            label: t('Users.label'),
            path: routes.Users.path,
            disabled: false,
            active: true,
            icon: <GroupIcon {...iconProps} />,
        },

        {
            key: routes.Profile.key,
            label: t('Profile.label'),
            path: routes.Profile.path,
            disabled: false,
            active: true,
            icon: <SupervisedUserCircleIcon {...iconProps} />,
        },

        {
            key: routes.Login.key,
            label: t('Login.label'),
            path: routes.Login.path,
            disabled: false,
            active: true,
            icon: <SupervisedUserCircleIcon {...iconProps} />,
        },
        {
            key: routes.LostPassword.key,
            label: t('LostPassword.label'),
            path: routes.LostPassword.path,
            disabled: false,
            active: true,
            icon: <SupervisedUserCircleIcon {...iconProps} />,
        },

        {
            key: routes.Error404.key,
            label: 'Error404',
            path: '/admin/dkfjhgkdjf',
            disabled: false,
            active: true,
            icon: <SupervisedUserCircleIcon {...iconProps} />,
        },
    ];

    const linkHandler = (path: string) => {
        navigate(path);
        if (isMobile) toggleSidebar();
    };

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
                                    {item.icon && (
                                        <ListItemIcon
                                            sx={{
                                                minWidth: {
                                                    xs: '2.5rem',
                                                    md: '2rem',
                                                },
                                                color: 'inherit',
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                    )}
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
