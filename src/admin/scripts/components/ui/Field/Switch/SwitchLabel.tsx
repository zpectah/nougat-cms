import React from 'react';
import { FormControlLabel, FormControlLabelProps } from '@mui/material';

import SwitchBase, { SwitchBaseProps } from './Switch.base';

type SwitchLabelPublicProps = {
    label: React.ReactNode,
    disabled?: boolean,
    labelProps?: FormControlLabelProps,
}
export type SwitchLabelProps = SwitchBaseProps & SwitchLabelPublicProps

const SwitchLabel = (props: SwitchLabelProps) => {
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
            control={<SwitchBase {...rest} />}
            {...labelProps}
        />
    );
};

export default SwitchLabel;
