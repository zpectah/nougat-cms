import React from 'react';

import OutlinedInputBase, { OutlinedInputBaseProps } from './OutlinedInput.base';

type OutlinedInputPublicProps = {}
export type OutlinedInputProps = OutlinedInputBaseProps & OutlinedInputPublicProps

const OutlinedInput = (props: OutlinedInputProps) => {
    const { ...rest } = props;

    return (
        <OutlinedInputBase
            {...rest}
        />
    );
};

export default OutlinedInput;
