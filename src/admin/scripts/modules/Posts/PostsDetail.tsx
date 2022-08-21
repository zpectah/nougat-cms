import React from 'react';

import { commonFormProps } from '../../types';
import {
    ControlledFormRow,
    Input,
} from '../../components';

type PostsDetailBaseProps = {}
export type PostsDetailProps = commonFormProps & PostsDetailBaseProps

const PostsDetail = (props: PostsDetailProps) => {
    const {
        form,
    } = props;

    const formValues = form.watch();
    const control = form.control;

    return (
        <>
            PostsDetail: form parts
            <br />
            {JSON.stringify(formValues, null, 2)}
            <br />
            <div>
                <ControlledFormRow
                    name="name"
                    control={control}
                    label="Label field A"
                    renderField={({ field: { ref, ...fieldRest }, id }) => (
                        <Input
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
                    errors={[ 'Some error text' ]}
                />
            </div>
        </>
    );
};

export default PostsDetail;
