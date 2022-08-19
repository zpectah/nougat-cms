import React, {useMemo} from 'react';
import {
    useController,
    UseControllerProps,
    UseControllerReturn,
} from 'react-hook-form';

import FormRow, { FormRowProps } from './FormRow';

type ControlledFormRowBaseProps = {
    name: string,
    control: UseControllerProps['control'],
    rules?: UseControllerProps['rules'],
    defaultValue?: UseControllerProps['defaultValue'],
    render?: (row: UseControllerReturn) => React.ReactNode,
    controllerProps?: UseControllerProps,
}
export type ControlledFormRowProps = FormRowProps & ControlledFormRowBaseProps

const ControlledFormRow = (props: ControlledFormRowProps) => {
    const {
        name,
        control,
        rules,
        defaultValue,
        render,
        controllerProps,
        children,
        ...rest
    } = props;

    const { field, fieldState, formState } = useController({
        name,
        control,
        rules,
        defaultValue,
        ...controllerProps,
    });

    const renderProps = useMemo(() => {
        return {
            field,
            fieldState,
            formState,
        };
    }, [ field, fieldState, formState ]);

    return (
        <FormRow
            {...rest}
        >
            {children && children}
            {render && render(renderProps)}
        </FormRow>
    );
};

export default ControlledFormRow;
