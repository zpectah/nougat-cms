import React from 'react';

import InputBase, { InputBaseProps } from './Input.base';

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
