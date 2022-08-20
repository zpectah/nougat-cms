import React from 'react';
import { Switch, SwitchProps } from '@mui/material';

type SwitchBasePublicProps = {}
export type SwitchBaseProps = SwitchProps & SwitchBasePublicProps

const SwitchBase = (props: SwitchBaseProps) => {
    const { ...rest } = props;

    return (
        <Switch
            {...rest}
        />
    );
};

export default SwitchBase;
