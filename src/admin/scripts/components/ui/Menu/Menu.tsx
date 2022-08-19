import React from 'react';
import {
    Menu as MuiMenu,
    MenuProps as MuiMenuProps,
} from '@mui/material';

import MenuItem, { MenuItemProps } from './MenuItem';
type MenuBaseProps = {
    items?: MenuItemProps[] | null,
}
export type MenuProps = MuiMenuProps & MenuBaseProps

const Menu = (props: MenuProps) => {
    const {
        items = [],
        children,
        ...rest
    } = props;

    return (
        <MuiMenu
            {...rest}
        >
            {children && children}
            {items && items.map((item) => (
                <MenuItem
                    {...item}
                />
            ))}
        </MuiMenu>
    );
};

export default Menu;
