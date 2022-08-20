import React from 'react';

import { DetailFormProps } from '../../types';
import {
    ControlledFormRow,
    Input,
} from '../../components';

type PostsDetailBaseProps = {}
export type PostsDetailProps = DetailFormProps & PostsDetailBaseProps

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
                    render={({ field: { ref, ...fieldRest }}) => (
                        <Input
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
                    errors={[ 'Some error text' ]}
                />
            </div>
        </>
    );
};

export default PostsDetail;

