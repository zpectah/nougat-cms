import React, {useMemo} from 'react';
import { useController } from 'react-hook-form';

import { rowControllerProps, rowControllerReturnProps } from '../../../types';
import FormRow, { FormRowProps } from './FormRow';

type ControlledFormRowBaseProps = {
    name: string,
    control: rowControllerProps['control'],
    rules?: rowControllerProps['rules'],
    defaultValue?: rowControllerProps['defaultValue'],
    render?: (row: rowControllerReturnProps) => React.ReactNode,
    controllerProps?: rowControllerProps,
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
