import React from 'react';
import { Chip as MuiChip, ChipProps as MuiChipProps } from '@mui/material';

type ChipBaseProps = {}
export type ChipProps = ChipBaseProps & MuiChipProps

const Chip = (props: ChipProps) => {
    const {
        ...rest
    } = props;

    return (
        <MuiChip
            {...rest}
        />
    );
};

export default Chip;
