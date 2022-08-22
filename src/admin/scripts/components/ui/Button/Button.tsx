import React, { useMemo } from 'react';
import { merge } from 'lodash';
import {
    Button as MuiButton,
    ButtonProps as MuiButtonProps,
} from '@mui/material';

type ButtonBaseProps = {
    primary?: boolean,
    secondary?: boolean,
    submit?: boolean,
    warning?: boolean,
    small?: boolean,
    large?: boolean,
}
export type ButtonProps = ButtonBaseProps & MuiButtonProps;

const Button = (props: ButtonProps) => {
    const {
        primary,
        secondary,
        submit,
        warning,
        small,
        large,
        ...rest
    } = props;

    const propsByType = useMemo(() => {
        let prop: MuiButtonProps = {
            type: 'button',
            sx: {
                whiteSpace: 'nowrap',
            },
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
        if (warning) prop = {
            ...prop,
            color: 'warning',
            variant: 'outlined',
        };
        if (submit) prop = {
            ...prop,
            type: 'submit',
        };
        if (small) prop = {
            ...prop,
            size: 'small',
        };
        if (large) prop = {
            ...prop,
            size: 'large',
        };

        return prop;
    }, [
        primary,
        secondary,
        warning,
        submit,
        small,
        large,
    ]);

    return (
        <MuiButton
            {...merge(propsByType, rest)}
        />
    );
};

export default Button;
