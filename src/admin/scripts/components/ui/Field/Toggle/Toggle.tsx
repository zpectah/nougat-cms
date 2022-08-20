import React from 'react';

import ToggleBase, { ToggleBaseProps } from './Toggle.base';

type TogglePublicProps = {}
export type ToggleProps = ToggleBaseProps & TogglePublicProps

const Toggle = (props: ToggleProps) => {
    const { ...rest } = props;

    return (
        <ToggleBase
            {...rest}
        />
    );
};

export default Toggle;
