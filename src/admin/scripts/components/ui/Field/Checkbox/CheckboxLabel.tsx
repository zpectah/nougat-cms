import React from 'react';
import { FormControlLabel, FormControlLabelProps } from '@mui/material';

import CheckboxBase, { CheckboxBaseProps } from './Checkbox.base';

type CheckboxLabelPublicProps = {
    label: React.ReactNode,
    disabled?: boolean,
    labelProps?: FormControlLabelProps,
}
export type CheckboxLabelProps = CheckboxBaseProps & CheckboxLabelPublicProps

const CheckboxLabel = (props: CheckboxLabelProps) => {
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
            control={<CheckboxBase {...rest} />}
            {...labelProps}
        />
    );
};

export default CheckboxLabel;
