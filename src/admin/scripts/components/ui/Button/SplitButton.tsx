import React, { useState, useRef } from 'react';
import { ButtonGroup, ButtonGroupProps } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { Menu, MenuProps } from '../Menu';
import Button, { ButtonProps } from './Button';

type SplitButtonBaseProps = {
    label?: string,
    buttonProps?: ButtonProps,
    menu?: MenuProps['items'],
    menuProps?: MenuProps,
}
export type SplitButtonProps = ButtonGroupProps & SplitButtonBaseProps

const SplitButton = (props: SplitButtonProps) => {
    const {
        label,
        buttonProps,
        menu,
        menuProps,
        disabled,
        id = 'split-menu',
        ...rest
    } = props;

    const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const group = useRef(null);

    const openHandler = (__event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(group.current);
    const closeHandler = () => setAnchorEl(null);

    return (
        <>
            <ButtonGroup
                ref={group}
                {...rest}
            >
                <Button
                    disabled={disabled}
                    {...buttonProps}
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
                items={menu}
                {...menuProps}
            />
        </>
    );
};

export default SplitButton;
