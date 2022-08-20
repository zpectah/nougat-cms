import React from 'react';
import {
    ToggleButton as MuiToggleButton,
    ToggleButtonProps as MuiToggleButtonProps,
} from '@mui/material';

type ToggleButtonPublicProps = {}
export type ToggleButtonProps = MuiToggleButtonProps & ToggleButtonPublicProps

const ToggleButton = (props: ToggleButtonProps) => {
    const { ...rest } = props;

    return (
        <MuiToggleButton
            {...rest}
        />
    );
};

export default ToggleButton;
