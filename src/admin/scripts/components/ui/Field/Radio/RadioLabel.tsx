import React from 'react';
import { FormControlLabel, FormControlLabelProps } from '@mui/material';

import RadioBase, { RadioBaseProps } from './Radio.base';

type RadioLabelPublicProps = {
    label: React.ReactNode,
    disabled?: boolean,
    labelProps?: FormControlLabelProps,
}
export type RadioLabelProps = RadioBaseProps & RadioLabelPublicProps

const RadioLabel = (props: RadioLabelProps) => {
    const {
        label,
        disabled,
        labelProps,
        ...rest
    } = props;

    return (
        <FormControlLabel
            label={label}
            disabled={disabled}
            control={<RadioBase {...rest} />}
            {...labelProps}
        />
    );
};

export default RadioLabel;
