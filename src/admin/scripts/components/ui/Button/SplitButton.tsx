import React, { useState, useRef } from 'react';
import { merge } from 'lodash';
import { ButtonGroup, ButtonGroupProps } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import {
    Menu,
    MenuItem,
    MenuProps,
    MenuItemProps,
} from '../Menu';
import Button, { ButtonProps } from './Button';

type SplitButtonBaseProps = {
    label?: string,
    mainButtonProps?: ButtonProps,
    buttonProps?: ButtonProps,
    menu?: MenuProps['items'],
    menuProps?: MenuProps,
    menuItemProps?: MenuItemProps,
    closableMenuItemClick?: boolean,
}
export type SplitButtonProps = ButtonGroupProps & SplitButtonBaseProps

const SplitButton = (props: SplitButtonProps) => {
    const {
        label,
        mainButtonProps,
        buttonProps,
        menu,
        menuProps,
        menuItemProps,
        closableMenuItemClick,
        disabled,
        id = 'split-menu',
        ...rest
    } = props;

    const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const group = useRef(null);

    const openHandler = (__event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(group.current);
    const closeHandler = () => setAnchorEl(null);

    const extendMenuOnClickHandler = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLLIElement>, callback: (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLLIElement>) => void) => {
        if (callback) {
            callback(event);
            closeHandler();
        }
    };

    return (
        <>
            <ButtonGroup
                ref={group}
                {...rest}
            >
                <Button
                    disabled={disabled}
                    {...merge(buttonProps, mainButtonProps)}
                >
                    {label}
                </Button>
                <Button
                    id={`${id}-button`}
                    aria-controls={open ? id : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={openHandler}
                    size="small"
                    disabled={disabled}
                    {...buttonProps}
                >
                    {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </Button>
            </ButtonGroup>
            <Menu
                id="split-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={closeHandler}
                MenuListProps={{
                    'aria-labelledby': `${id}-button`,
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                items={!closableMenuItemClick ? menu : null}
                children={(
                    <>
                        {closableMenuItemClick && menu?.map(({ onClick, ...rest}) => (
                            <MenuItem
                                onClick={(e) => onClick && extendMenuOnClickHandler(e, () => onClick(e))}
                                {...rest}
                                {...menuItemProps}
                            />
                        ))}
                    </>
                )}
                {...menuProps}
            />
        </>
    );
};

export default SplitButton;
