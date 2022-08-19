import React from 'react';
import { useForm } from 'react-hook-form';

import { commonItemModelProps, formProps, formReturnProps } from '../../../types';
import Form, { FormProps } from './Form';

type ControlledFormBaseProps = {
    mode?: formProps['mode'],
    defaultValues?: commonItemModelProps,
    formProps?: formProps,
    render?: (form: formReturnProps) => React.ReactNode,
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
