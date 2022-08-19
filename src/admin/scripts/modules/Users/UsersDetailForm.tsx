import React from 'react';
import { TextField } from '@mui/material';

import {
    ControlledFormRow,
    ControlledFormRowProps,
} from '../../components';

type UsersDetailFormBaseProps = {
    control: ControlledFormRowProps['control'],
}
export type UsersDetailFormProps = UsersDetailFormBaseProps

const UsersDetailForm = (props: UsersDetailFormProps) => {
    const { control } = props;

    return (
        <>
            UsersDetailForm: form parts
            <br />
            <div>
                <ControlledFormRow
                    name="fieldA"
                    control={control}
                    label="Label field A"
                    render={({ field: { onChange, onBlur, value, name, ref }}) => (
                        <TextField
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            name={name}
                            inputRef={ref}
                        />
                    )}
                    helpers={[ 'Some text helper' ]}
                />
                <ControlledFormRow
                    name="fieldB"
                    control={control}
                    label="Label field B"
                    render={(row) => (
                        <>
                            rendered field ... B ... {JSON.stringify(row, null, 2)}
                        </>
                    )}
                    errors={[ 'Some error text' ]}
                />
            </div>
        </>
    );
};

export default UsersDetailForm;
