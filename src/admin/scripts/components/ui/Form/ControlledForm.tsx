import React from 'react';
import {
    useForm,
    UseFormProps,
    UseFormReturn,
} from 'react-hook-form';

import Form, { FormProps } from './Form';

type ControlledFormBaseProps = {
    mode?: UseFormProps['mode'],
    defaultValues?: UseFormProps['defaultValues'],
    formProps?: UseFormProps,
    render?: (form: UseFormReturn) => React.ReactNode,
}
export type ControlledFormProps = FormProps & ControlledFormBaseProps

const ControlledForm = (props: ControlledFormProps) => {
    const {
        mode,
        defaultValues,
        formProps,
        render,
        children,
        ...rest
    } = props;

    const form = useForm({
        mode,
        defaultValues,
        ...formProps,
    });

    return (
        <Form
            {...rest}
        >
            {children && children}
            {render && render(form)}
        </Form>
    );
};

export default ControlledForm;
