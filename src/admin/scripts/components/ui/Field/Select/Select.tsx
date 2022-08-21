import React from 'react';

import SelectBase, { SelectBaseProps } from './Select.base';

type SelectPublicProps = {}
export type SelectProps = SelectBaseProps & SelectPublicProps

const Select = (props: SelectProps) => {
    const { ...rest } = props;

    return (
        <SelectBase
            size="small"
            {...rest}
        />
    );
};

export default Select;
