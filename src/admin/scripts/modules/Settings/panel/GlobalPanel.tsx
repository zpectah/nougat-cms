import React from 'react';

import { commonFormProps } from '../../../types';
import {
    Section,
    ControlledFormRow,
    Input,
} from '../../../components';

type GlobalPanelBaseProps = {}
export type GlobalPanelProps = commonFormProps & GlobalPanelBaseProps

const GlobalPanel = (props: GlobalPanelProps) => {
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
                    label="Label field ... Global panel"
                    render={({ field: { ref, ...fieldRest }}) => (
                        <Input
                            {...fieldRest}
                            inputRef={ref}
                        />
                    )}
                    helpers={[ 'Some text helper' ]}
                />

                <ControlledFormRow
                    name="name"
                    control={control}
                    label="Label field ... Global panel"
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
                label="Label field ... Global panel"
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

export default GlobalPanel;
