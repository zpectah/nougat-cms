import React from 'react';
import {
    Backdrop as MuiBackdrop,
    BackdropProps as MuiBackdropProps,
} from '@mui/material';

type BackdropBaseProps = {}
export type BackdropProps = MuiBackdropProps & BackdropBaseProps

const Backdrop = (props: BackdropProps) => {
    const { ...rest } = props;

    return (
        <MuiBackdrop
            {...rest}
        />
    );
};

export default Backdrop;
