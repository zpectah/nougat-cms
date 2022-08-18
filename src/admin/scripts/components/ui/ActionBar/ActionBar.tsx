import React, { useState } from 'react';
import { Stack, StackProps } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import {
    IconButton,
    CloseButton,
    IconButtonProps,
} from '../IconButton';
import {
    Menu,
    MenuProps,
    MenuItemProps,
} from '../Menu';

type ActionBarBaseProps = {
    children?: React.ReactNode,
    onClose?: boolean | (() => void),
    onExpandToggle?: boolean | (() => void),
    expanded?: boolean,
    menu?: MenuItemProps[],
    menuIcon?: React.ReactNode,
    menuProps?: MenuProps,
    iconButtonSize?: 'small' | 'medium' | 'large' | undefined,
    iconButtonProps?: IconButtonProps,
    id?: string,
}
export type ActionBarProps = StackProps & ActionBarBaseProps

const ActionBar: React.FC<ActionBarProps> = (props) => {
    const {
        children,
        onClose,
        onExpandToggle,
        expanded,
        menu,
        menuIcon,
        menuProps,
        iconButtonSize,
        iconButtonProps,
        id = 'action-menu',
        ...rest
    } = props;

    const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);

    const menuOpen = Boolean(anchorEl);

    const closeHandler = () => {
        if (typeof onClose === 'function') onClose();
    };
    const expandToggleHandler = () => {
        if (typeof onExpandToggle === 'function') onExpandToggle();
    };
    const openMenuHandler = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const closeMenuHandler = () => setAnchorEl(null);

    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            {...rest}
        >
            {children}
            {menu && (
                <>
                    <IconButton
                        id={`${id}-button`}
                        aria-controls={menuOpen ? id : undefined}
                        aria-haspopup="true"
                        aria-expanded={menuOpen ? 'true' : undefined}
                        size={iconButtonSize}
                        onClick={openMenuHandler}
                        {...iconButtonProps}
                    >
                        {menuIcon ? menuIcon : <MoreHorizIcon />}
                    </IconButton>
                    <Menu
                        id={id}
                        open={menuOpen}
                        onClose={closeMenuHandler}
                        anchorEl={anchorEl}
                        items={menu}
                        MenuListProps={{ 'aria-labelledby': `${id}-button` }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        {...menuProps}
                    />
                </>
            )}
            {onExpandToggle && (
                <IconButton
                    size={iconButtonSize}
                    onClick={expandToggleHandler}
                    {...iconButtonProps}
                >
                    {expanded ? (
                        <ExpandLessIcon />
                    ) : (
                        <ExpandMoreIcon />
                    )}
                </IconButton>
            )}
            {onClose && (
                <CloseButton
                    size={iconButtonSize}
                    onClick={closeHandler}
                    {...iconButtonProps}
                />
            )}
        </Stack>
    );
};

export default ActionBar;
