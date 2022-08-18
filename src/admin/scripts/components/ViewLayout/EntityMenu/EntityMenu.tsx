import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import routes from '../../../routes';
import { useEntity, useTheme as useUiTheme } from '../../../hooks';
import { Themes } from '../../../enums';
import {
    Button,
    ConfirmDialog,
    Menu,
    MenuItemProps,
} from '../../ui';

const EntityMenu = () => {
    const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);
    const [ confirmOpen, setConfirmOpen ] = useState(false);

    const navigate = useNavigate();
    const { palette } = useTheme();
    const {
        entity,
        logout,
        avataaarSrc,
    } = useEntity();
    const { theme, toggleTheme } = useUiTheme();

    const open = Boolean(anchorEl);

    const openHandler = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const closeHandler = () => setAnchorEl(null);

    const profileHandler = () => {
        navigate(routes.Profile.path as string);
        closeHandler();
    };
    const switchThemeHandler = () => {
        toggleTheme();
        closeHandler();
    };
    const logoutHandler = () => {
        setConfirmOpen(true);
        closeHandler();
    };
    const closeConfirmHandler = () => {
        setConfirmOpen(false);
    };
    const logoutConfirmHandler = () => {
        closeConfirmHandler();
        logout();
    };

    const menuItems: MenuItemProps[] = [
        {
            key: 'profile',
            children: 'Profile',
            onClick: profileHandler,
        },
        {
            key: 'theme',
            children: `Set mode to ${theme === Themes['light'] ? Themes['dark'] : Themes['light']}`,
            onClick: switchThemeHandler,
        },
        {
            key: 'logout',
            children: 'Log out',
            onClick: logoutHandler,
        },
    ];

    return (
        <>
            {entity ? (
                <>
                    <Button
                        id="entity-menu-button"
                        aria-controls={open ? 'entity-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={openHandler}
                        endIcon={
                            <Avatar
                                alt={entity.fullname}
                                src={avataaarSrc}
                                sx={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                        }
                        sx={{
                            pl: 2.5,
                            pr: 1.5,
                            textTransform: 'unset',
                            borderRadius: 40,
                            backgroundColor: {
                                xs: 'inherit',
                                md: palette.primary.main,
                            },
                            color: {
                                xs: 'inherit',
                                md: palette.primary.contrastText,
                            },
                            '&:hover': {
                                backgroundColor: {
                                    xs: 'inherit',
                                    md: palette.primary.dark,
                                },
                                color: {
                                    xs: 'inherit',
                                    md: palette.primary.contrastText,
                                },
                            },
                        }}
                    >
                        {entity.email}
                    </Button>
                    <Menu
                        id="entity-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={closeHandler}
                        MenuListProps={{
                            'aria-labelledby': 'entity-menu-button',
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        items={menuItems}
                    />
                    <ConfirmDialog
                        open={confirmOpen}
                        onClose={closeConfirmHandler}
                        title="Leave application"
                        content={
                            <>Are you sure you want to log out?</>
                        }
                        onConfirm={logoutConfirmHandler}
                    />
                </>
            ) : (
                <>Entity loading ...</>
            )}
        </>
    );
};

export default EntityMenu;
