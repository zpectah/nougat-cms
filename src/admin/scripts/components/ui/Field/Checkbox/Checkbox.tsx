import React from 'react';

import CheckboxBase, { CheckboxBaseProps } from './Checkbox.base';

type CheckboxPublicProps = {}
export type CheckboxProps = CheckboxBaseProps & CheckboxPublicProps

const Checkbox = (props: CheckboxProps) => {
    const { ...rest } = props;

    return (
        <CheckboxBase
            {...rest}
        />
    );
};

export default Checkbox;
