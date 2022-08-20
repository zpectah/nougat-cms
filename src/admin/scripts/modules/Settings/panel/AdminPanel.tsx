import React from 'react';

import { commonFormProps } from '../../../types';
import {
    Section,
    ControlledFormRow,
    Input,
} from '../../../components';

type AdminPanelBaseProps = {}
export type AdminPanelProps = commonFormProps & AdminPanelBaseProps

const AdminPanel = (props: AdminPanelProps) => {
    const {
        form,
    } = props;

    const formValues = form.watch();
    const control = form.control;

    return (
        <>

            <Section
                title="Settings section title"
                withYOffset
            >

                <ControlledFormRow
                    name="name"
                    control={control}
                    label="Label field ... Admin panel"
                    render={({ field: { ref, ...fieldRest }}) => (
                        <Input
                            {...fieldRest}
                            inputRef={ref}
                        />
                    )}
                    helpers={[ 'Some text helper' ]}
                />

            </Section>

            <ControlledFormRow
                name="name"
                control={control}
                label="Label field ... Admin panel"
                render={({ field: { ref, ...fieldRest }}) => (
                    <Input
                        {...fieldRest}
                        inputRef={ref}
                    />
                )}
                helpers={[ 'Some text helper' ]}
            />

        </>
    );
};

export default AdminPanel;
