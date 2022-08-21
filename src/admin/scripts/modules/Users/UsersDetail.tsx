import React from 'react';

import { commonFormProps } from '../../types';
import {
    ControlledFormRow,
    Input,
} from '../../components';

type UsersDetailBaseProps = {}
export type UsersDetailProps = commonFormProps & UsersDetailBaseProps

const UsersDetail = (props: UsersDetailProps) => {
    const {
        form,
    } = props;

    const formValues = form.watch();
    const control = form.control;

    return (
        <>
            UsersDetailForm: form parts
            <br />
            {JSON.stringify(formValues, null, 2)}
            <br />
            <div>
                <ControlledFormRow
                    name="email"
                    control={control}
                    label="Label field A"
                    renderField={({ field: { ref, ...fieldRest }, id }) => (
                        <Input
                            type="email"
                            id={id}
                            {...fieldRest}
                            inputRef={ref}
                        />
                    )}
                    helpers={[ 'Some text helper' ]}
                />
                <ControlledFormRow
                    name="type"
                    control={control}
                    label="Label field B"
                    renderField={({ field: { ref, ...fieldRest }, id }) => (
                        <Input
                            id={id}
                            {...fieldRest}
                            inputRef={ref}
                        />
                    )}
                    helpers={[ 'Some text helper' ]}
                    errors={[ 'Some error text' ]}
                />
            </div>
        </>
    );
};

export default UsersDetail;
