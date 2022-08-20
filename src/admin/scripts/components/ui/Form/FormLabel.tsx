import React from 'react';
import { merge } from 'lodash';
import {
    FormLabel as MuiFormLabel,
    FormLabelProps as MuiFormLabelProps,
} from '@mui/material';

type FormLabelBaseProps = {}
export type FormLabelProps = MuiFormLabelProps & FormLabelBaseProps

const FormLabel = (props: FormLabelProps) => {
    const { sx, ...rest } = props;

    return (
        <MuiFormLabel
            sx={merge(sx, {
                fontWeight: 600,
            })}
            {...rest}
        />
    );
};

export default FormLabel;
