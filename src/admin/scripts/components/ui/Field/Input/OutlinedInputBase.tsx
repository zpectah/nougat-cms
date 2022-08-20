import React from 'react';
import { OutlinedInput, OutlinedInputProps } from '@mui/material';

type OutlinedInputBasePublicProps = {}
export type OutlinedInputBaseProps = OutlinedInputProps & OutlinedInputBasePublicProps

const OutlinedInputBase = (props: OutlinedInputBaseProps) => {
    const { ...rest } = props;

    return (
        <OutlinedInput
            {...rest}
        />
    );
};

export default OutlinedInputBase;
