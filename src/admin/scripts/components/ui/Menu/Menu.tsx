import React from 'react';
import {
    Menu as MuiMenu,
    MenuItem as MuiMenuItem,
    MenuProps as MuiMenuProps,
    MenuItemProps as MuiMenuItemProps,
} from '@mui/material';

export type MenuItemProps = MuiMenuItemProps & {
    key?: string | number,
    open?: boolean | undefined,
}

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
                <MuiMenuItem
                    {...item}
                />
            ))}
        </MuiMenu>
    );
};

export default Menu;
