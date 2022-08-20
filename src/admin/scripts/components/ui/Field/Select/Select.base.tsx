import React from 'react';
import {
    Select,
    FormControl,
    SelectProps,
    FormControlProps,
} from '@mui/material';

import { MenuItem, MenuItemProps } from '../../Menu';

type SelectBasePublicProps = {
    items?: MenuItemProps[],
    formControlProps?: FormControlProps,
}
export type SelectBaseProps = SelectProps & SelectBasePublicProps

const SelectBase = (props: SelectBaseProps) => {
    const {
        items = [],
        formControlProps,
        children,
        ...rest
    } = props;

    return (
        <FormControl
            fullWidth
            {...formControlProps}
        >
            <Select
                {...rest}
            >
                {children && children}
                {items.map((item, index) => (
                    <MenuItem
                        key={(item?.id || item?.key) || index}
                        {...item}
                    />
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectBase;
