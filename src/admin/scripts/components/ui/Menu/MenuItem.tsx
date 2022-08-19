import React from 'react';
import {
    MenuItem as MuiMenuItem,
    MenuItemProps as MuiMenuItemProps,
} from '@mui/material';

type MenuItemBaseProps = {
    key?: string | number,
    open?: boolean | undefined,
}
export type MenuItemProps = MuiMenuItemProps & MenuItemBaseProps

const MenuItem = (props: MenuItemProps) => {
    const { ...rest } = props;

    return (
        <MuiMenuItem
            {...rest}
        />
    );
};

export default MenuItem;
