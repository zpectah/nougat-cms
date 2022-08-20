import React from 'react';
import { Radio, RadioProps } from '@mui/material';

type RadioBasePublicProps = {}
export type RadioBaseProps = RadioProps & RadioBasePublicProps

const RadioBase = (props: RadioBaseProps) => {
    const { ...rest } = props;

    return (
        <Radio
            {...rest}
        />
    );
};

export default RadioBase;
