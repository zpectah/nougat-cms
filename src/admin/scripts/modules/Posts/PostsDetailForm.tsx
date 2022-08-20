import React from 'react';

import { DetailFormProps } from '../../types';
import {
    ControlledFormRow,
    ControlledFormRowProps,
    Input,
} from '../../components';

type PostsDetailFormBaseProps = {}
export type PostsDetailFormProps = DetailFormProps & PostsDetailFormBaseProps

const PostsDetailForm = (props: PostsDetailFormProps) => {
    const {
        form,
    } = props;

    const formValues = form.watch();
    const control = form.control;

    return (
        <>
            PostsDetailForm: form parts
            <br />
            {JSON.stringify(formValues, null, 2)}
            <br />
            <div>
                <ControlledFormRow
                    name="fieldA"
                    control={control}
                    label="Label field A"
                    render={({ field: { onChange, onBlur, value, name, ref }}) => (
                        <Input
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

export default PostsDetailForm;

