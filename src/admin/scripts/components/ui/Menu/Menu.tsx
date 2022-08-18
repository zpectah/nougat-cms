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
    items: MenuItemProps[],
}
export type MenuProps = MuiMenuProps & MenuBaseProps

const Menu = (props: MenuProps) => {
    const {
        items = [],
        ...rest
    } = props;

    return (
        <MuiMenu
            {...rest}
        >
            {items.map((item) => (
                <MuiMenuItem
                    {...item}
                />
            ))}
        </MuiMenu>
    );
};

export default Menu;
