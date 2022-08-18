import React from 'react';

import { Model } from '../../enums';
import { modelKeyType } from '../../types';
import { SplitButton, SplitButtonProps, MenuProps } from '../ui';

type CreateButtonBaseProps = {
    model?: modelKeyType,
    disabled?: boolean,
    menuProps?: MenuProps,
}
export type CreateButtonProps = SplitButtonProps & CreateButtonBaseProps

const CreateButton = (props: CreateButtonProps) => {
    const {
        model,
        disabled,
        menuProps,
        ...rest
    } = props;

    const menu = [
        {
            key: 'a',
            children: 'New Users',
            disabled: model === Model['Users'],
        },
        {
            key: 'b',
            children: 'New Posts',
            disabled: model === Model['Posts'],
        },
    ];

    return (
        <SplitButton
            id={`CreateButton_${model}`}
            label={`New ${model}`}
            variant="contained"
            color="success"
            menu={menu}
            disabled={disabled}
            menuProps={menuProps}
            {...rest}
        />
    );
};

export default CreateButton;
