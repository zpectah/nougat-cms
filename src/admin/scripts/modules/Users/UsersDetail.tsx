import React from 'react';

import { DetailFormProps } from '../../types';
import {
    ControlledFormRow,
    Input,
} from '../../components';

type UsersDetailBaseProps = {}
export type UsersDetailProps = DetailFormProps & UsersDetailBaseProps

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
                    render={({ field: { ref, ...fieldRest }}) => (
                        <Input
                            type="email"
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
                    render={({ field: { ref, ...fieldRest }}) => (
                        <Input
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
