import React from 'react';

import SwitchBase, { SwitchBaseProps } from './Switch.base';

type SwitchPublicProps = {}
export type SwitchProps = SwitchBaseProps & SwitchPublicProps

const Switch = (props: SwitchProps) => {
    const { ...rest } = props;

    return (
        <SwitchBase
            {...rest}
        />
    );
};

export default Switch;
