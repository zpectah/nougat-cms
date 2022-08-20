import React from 'react';

import InputBase, { InputBaseProps } from './InputBase';

type InputPublicProps = {}
export type InputProps = InputBaseProps & InputPublicProps

const Input = (props: InputProps) => {
    const { ...rest } = props;

    return (
        <InputBase
            size="small"
            fullWidth
            {...rest}
        />
    );
};

export default Input;
