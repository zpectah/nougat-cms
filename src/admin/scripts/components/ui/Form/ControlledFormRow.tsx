import React, {useMemo} from 'react';
import { useController } from 'react-hook-form';

import { getToken } from '../../../utils';
import { rowControllerProps, rowControllerReturnProps } from '../../../types';
import FormRow, { FormRowProps, FormRowRenderProps } from './FormRow';

type ControlledFormRowBaseProps = {
    name: string,
    control: rowControllerProps['control'],
    rules?: rowControllerProps['rules'],
    defaultValue?: rowControllerProps['defaultValue'],
    renderField?: (row: rowControllerReturnProps & FormRowRenderProps) => React.ReactNode,
    controllerProps?: rowControllerProps,
}
export type ControlledFormRowProps = FormRowProps & ControlledFormRowBaseProps

const ControlledFormRow = (props: ControlledFormRowProps) => {
    const {
        name,
        control,
        rules,
        defaultValue,
        renderField,
        controllerProps,
        id,
        children,
        ...rest
    } = props;

    const uid = id || getToken();
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
            id: uid,
        };
    }, [ field, fieldState, formState, uid ]);

    return (
        <FormRow
            id={uid}
            {...rest}
        >
            {children && children}
            {renderField && renderField(renderProps)}
        </FormRow>
    );
};

export default ControlledFormRow;
