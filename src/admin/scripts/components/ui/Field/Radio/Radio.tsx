import React from 'react';

import RadioBase, { RadioBaseProps } from './Radio.base';

type RadioPublicProps = {}
export type RadioProps = RadioBaseProps & RadioPublicProps

const Radio = (props: RadioProps) => {
    const { ...rest } = props;

    return (
        <RadioBase
            {...rest}
        />
    );
};

export default Radio;
