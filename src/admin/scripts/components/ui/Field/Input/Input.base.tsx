import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

type InputBasePublicProps = {}
export type InputBaseProps = TextFieldProps & InputBasePublicProps

const InputBase = (props: InputBaseProps) => {
    const { ...rest } = props;

    return (
        <TextField
            {...rest}
        />
    );
};

export default InputBase;
