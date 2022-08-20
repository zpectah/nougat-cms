import React from 'react';
import {
    ToggleButtonGroup,
    ToggleButtonGroupProps,
} from '@mui/material';

import ToggleButton, { ToggleButtonProps } from './ToggleButton';

type ToggleBasePublicProps = {
    items?: ToggleButtonProps[],
}
export type ToggleBaseProps = ToggleButtonGroupProps & ToggleBasePublicProps

const ToggleBase = (props: ToggleBaseProps) => {
    const {
        items = [],
        children,
        ...rest
    } = props;

    return (
        <ToggleButtonGroup
            {...rest}
        >
            {children && children}
            {items.map((item, index) => (
                <ToggleButton
                    key={(item?.id || item?.key) || index}
                    {...item}
                />
            ))}
        </ToggleButtonGroup>
    );
};

export default ToggleBase;
