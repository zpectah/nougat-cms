import React from 'react';

import { commonFormProps } from '../../../types';
import {
    Section,
    ControlledFormRow,
    Input,
} from '../../../components';

type WebPanelBaseProps = {}
export type WebPanelProps = commonFormProps & WebPanelBaseProps

const WebPanel = (props: WebPanelProps) => {
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
                    label="Label field ... Web panel"
                    renderField={({ field: { ref, ...fieldRest }, id }) => (
                        <Input
                            id={id}
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
                label="Label field ... Web panel"
                renderField={({ field: { ref, ...fieldRest }, id }) => (
                    <Input
                        id={id}
                        {...fieldRest}
                        inputRef={ref}
                    />
                )}
                helpers={[ 'Some text helper' ]}
            />

        </>
    );
};

export default WebPanel;
