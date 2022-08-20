import React from 'react';
import {
    FormHelperText,
    FormHelperTextProps,
} from '@mui/material';

type HelperTextBaseProps = {}
export type HelperTextProps = FormHelperTextProps & HelperTextBaseProps

const HelperText = (props: HelperTextProps) => {
    const { ...rest } = props;

    return (
        <FormHelperText
            {...rest}
        />
    );
};

export default HelperText;
