import React, { useMemo } from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

type ButtonBaseProps = {
    primary?: boolean,
    secondary?: boolean,
    submit?: boolean,
}
export type ButtonProps = ButtonBaseProps & MuiButtonProps;

const Button = (props: ButtonProps) => {
    const {
        primary,
        secondary,
        submit,
        ...rest
    } = props;

    const propsByType = useMemo(() => {
        let prop: MuiButtonProps = {
            type: 'button',
        };
        if (primary || submit) prop = {
            ...prop,
            color: 'primary',
            variant: 'contained',
        };
        if (secondary) prop = {
            ...prop,
            color: 'secondary',
            variant: 'outlined',
        };
        if (submit) prop = {
            type: 'submit',
        };

        return prop;
    }, [ primary, secondary, submit ]);

    return (
        <MuiButton
            {...propsByType}
            {...rest}
        />
    );
};

export default Button;
