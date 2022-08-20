import React from 'react';
import { Checkbox, CheckboxProps } from '@mui/material';

type CheckboxBasePublicProps = {}
export type CheckboxBaseProps = CheckboxProps & CheckboxBasePublicProps

const CheckboxBase = (props: CheckboxBaseProps) => {
    const { ...rest } = props;

    return (
        <Checkbox
            {...rest}
        />
    );
};

export default CheckboxBase;
