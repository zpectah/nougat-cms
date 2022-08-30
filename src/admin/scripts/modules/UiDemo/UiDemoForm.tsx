import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Divider, Stack } from '@mui/material';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

import { commonItemModelProps } from '../../types';
import {
    Form,
    FormRow,
    ControlledFormRow,
    Section,
    Input,
    Select,
    Button,
    Checkbox,
    CheckboxLabel,
    CheckboxGroup,
    Switch,
    SwitchLabel,
    SwitchGroup,
    Radio,
    RadioGroup,
    Code,
    Slider,
    Toggle,
    Wysiwyg,
} from '../../components';

type UiDemoFormBaseProps = {
    defaultValues: commonItemModelProps,
    onReload: () => void,
    onSubmit: (payload: commonItemModelProps) => void,
}
export type UiDemoFormProps = UiDemoFormBaseProps

const UiDemoForm = (props: UiDemoFormProps) => {
    const {
        defaultValues,
        onReload,
        onSubmit,
    } = props;

    const form = useForm({
        mode: 'all',
        defaultValues,
    });
    const formValues = form.watch();
    const control = form.control;
    const handleSubmit = form.handleSubmit;

    const reloadHandler = () => {
        onReload && onReload();
    };
    const submitHandler = (formData: commonItemModelProps) => {
        // TODO: master ...
        console.log('submitHandler', formData);
        onSubmit && onSubmit(formData);
    };

    return (
        <>
            <Form
                id="UiDemoFormForm"
                name="UiDemoFormForm"
                onSubmit={handleSubmit(submitHandler)}
            >
                <>
                    <Stack
                        direction="column"
                        spacing={3}
                    >

                        <Section
                            title="Form row ✅"
                        >

                            <ControlledFormRow
                                name="base"
                                label="Controlled row"
                                control={control}
                                renderField={({ field: { ref, ...fieldRest }, id }) => (
                                    <Input
                                        id={id}
                                        inputRef={ref}
                                        {...fieldRest}
                                    />
                                )}
                                helpers={[ 'Some text helper' ]}
                                errors={[ 'Some error text' ]}
                            />

                            <FormRow
                                emptyLabel
                            >
                                spaced empty field without label ...
                            </FormRow>

                        </Section>

                        <Section
                            title="Input ✅"
                        >

                            <ControlledFormRow
                                name="text"
                                label="Text value"
                                control={control}
                                renderField={({ field: { ref, ...fieldRest }, id }) => (
                                    <Input
                                        id={id}
                                        inputRef={ref}
                                        {...fieldRest}
                                    />
                                )}
                            />
                            <ControlledFormRow
                                name="email"
                                label="Email value"
                                control={control}
                                renderField={({ field: { ref, ...fieldRest }, id }) => (
                                    <Input
                                        type="email"
                                        id={id}
                                        inputRef={ref}
                                        {...fieldRest}
                                    />
                                )}
                            />
                            <ControlledFormRow
                                name="password"
                                label="Password value"
                                control={control}
                                renderField={({ field: { ref, ...fieldRest }, id }) => (
                                    <Input
                                        type="password"
                                        id={id}
                                        inputRef={ref}
                                        {...fieldRest}
                                    />
                                )}
                            />
                            <ControlledFormRow
                                name="search"
                                label="Search value"
                                control={control}
                                renderField={({ field: { ref, ...fieldRest }, id }) => (
                                    <Input
                                        type="search"
                                        id={id}
                                        inputRef={ref}
                                        {...fieldRest}
                                    />
                                )}
                            />
                            <ControlledFormRow
                                name="number"
                                label="Number value"
                                control={control}
                                renderField={({ field: { ref, ...fieldRest }, id }) => (
                                    <Input
                                        type="number"
                                        id={id}
                                        inputRef={ref}
                                        {...fieldRest}
                                    />
                                )}
                            />

                        </Section>

                        <Section
                            title="Select ✅"
                        >

                            <ControlledFormRow
                                name="select"
                                label="Select value"
                                control={control}
                                renderField={({ field: { ref, ...fieldRest }, id }) => (
                                    <Select
                                        id={id}
                                        items={[
                                            {
                                                id: '1',
                                                value: '1',
                                                children: 'Value 1',
                                            },
                                            {
                                                id: '2',
                                                value: '2',
                                                children: 'Value 2',
                                            },
                                            {
                                                id: '3',
                                                value: '3',
                                                children: 'Value 3',
                                            },
                                        ]}
                                        inputRef={ref}
                                        {...fieldRest}
                                    />
                                )}
                            />
                            <ControlledFormRow
                                name="select2"
                                label="Select with value"
                                control={control}
                                renderField={({ field: { ref, ...fieldRest }, id }) => (
                                    <Select
                                        id={id}
                                        items={[
                                            {
                                                id: 's2.1',
                                                value: '1',
                                                children: 'Value 1',
                                            },
                                            {
                                                id: 's2.2',
                                                value: '2',
                                                children: 'Value 2',
                                            },
                                            {
                                                id: 's2.3',
                                                value: '3',
                                                children: 'Value 3',
                                            },
                                        ]}
                                        inputRef={ref}
                                        {...fieldRest}
                                    />
                                )}
                            />
                            <ControlledFormRow
                                name="selectMultiple"
                                label="Multi-select value"
                                control={control}
                                renderField={({ field: { ref, ...fieldRest }, id }) => (
                                    <Select
                                        id={id}
                                        items={[
                                            {
                                                id: 'g0.1',
                                                value: '1',
                                                children: 'Value 1',
                                            },
                                            {
                                                id: 'g0.2',
                                                value: '2',
                                                children: 'Value 2',
                                            },
                                            {
                                                id: 'g0.3',
                                                value: '3',
                                                children: 'Value 3',
                                            },
                                            {
                                                id: 'g0.4',
                                                value: '4',
                                                children: 'Value 4',
                                            },
                                            {
                                                id: 'g0.5',
                                                value: '5',
                                                children: 'Value 5',
                                            },
                                        ]}
                                        multiple
                                        inputRef={ref}
                                        {...fieldRest}
                                    />
                                )}
                            />

                        </Section>

                        <Section
                            title="Checkbox ✅"
                        >

                            <ControlledFormRow
                                name="checkbox"
                                label="Checkbox value"
                                control={control}
                                renderField={({ field: { ref, value, ...fieldRest }, id }) => (
                                    <Checkbox
                                        id={id}
                                        checked={!!value}
                                        value={value}
                                        inputRef={ref}
                                        {...fieldRest}
                                    />
                                )}
                            />

                            <ControlledFormRow
                                name="checkboxLabel"
                                label="Checkbox label value"
                                control={control}
                                renderField={({ field: { ref, value, ...fieldRest }, id }) => (
                                    <CheckboxLabel
                                        label="Checkbox value"
                                        id={id}
                                        checked={!!value}
                                        value={value}
                                        inputRef={ref}
                                        {...fieldRest}
                                    />
                                )}
                            />

                            <ControlledFormRow
                                name="checkboxGroup"
                                label="Checkbox group value"
                                control={control}
                                renderField={({ field: { ref, ...fieldRest }, id }) => (
                                    <CheckboxGroup
                                        id={id}
                                        items={[
                                            {
                                                id: 'g1.1',
                                                value: '1',
                                                label: 'Value 1',
                                            },
                                            {
                                                id: 'g1.2',
                                                value: '2',
                                                label: 'Value 2',
                                            },
                                            {
                                                id: 'g1.3',
                                                value: '3',
                                                label: 'Value 3',
                                            },
                                        ]}
                                        // inputRef={ref}
                                        {...fieldRest}
                                    />
                                )}
                            />

                        </Section>

                        <Section
                            title="Switch ✅"
                        >

                            <ControlledFormRow
                                name="switch"
                                label="Switch value"
                                control={control}
                                renderField={({ field: { ref, value, ...fieldRest }, id }) => (
                                    <Switch
                                        id={id}
                                        checked={!!value}
                                        value={value}
                                        inputRef={ref}
                                        {...fieldRest}
                                    />
                                )}
                            />

                            <ControlledFormRow
                                name="switchLabel"
                                label="Switch label value"
                                control={control}
                                renderField={({ field: { ref, value, ...fieldRest }, id }) => (
                                    <SwitchLabel
                                        label="Switch value"
                                        id={id}
                                        checked={!!value}
                                        value={value}
                                        inputRef={ref}
                                        {...fieldRest}
                                    />
                                )}
                            />

                            <ControlledFormRow
                                name="switchGroup"
                                label="Switch group value"
                                control={control}
                                renderField={({ field: { ref, ...fieldRest }, id }) => (
                                    <SwitchGroup
                                        id={id}
                                        items={[
                                            {
                                                id: 'g2.1',
                                                value: '1',
                                                label: 'Value 1',
                                            },
                                            {
                                                id: 'g2.2',
                                                value: '2',
                                                label: 'Value 2',
                                            },
                                            {
                                                id: 'g2.3',
                                                value: '3',
                                                label: 'Value 3',
                                            },
                                        ]}
                                        // inputRef={ref}
                                        {...fieldRest}
                                    />
                                )}
                            />

                        </Section>

                        <Section
                            title="Radio ✅"
                        >

                            <ControlledFormRow
                                name="radio"
                                label="Radio value"
                                control={control}
                                renderField={({ field: { ref, value, ...fieldRest }, id }) => (
                                    <Radio
                                        id={id}
                                        checked={value === '33'}
                                        value={'33'}
                                        inputRef={ref}
                                        {...fieldRest}
                                    />
                                )}
                            />

                            <ControlledFormRow
                                name="radioGroup"
                                label="Radio group value"
                                control={control}
                                renderField={({ field: { ref, ...fieldRest }, id }) => (
                                    <RadioGroup
                                        id={id}
                                        items={[
                                            {
                                                id: 'g3.1',
                                                value: '1',
                                                label: 'Value 1',
                                            },
                                            {
                                                id: 'g3.2',
                                                value: '2',
                                                label: 'Value 2',
                                            },
                                            {
                                                id: 'g3.3',
                                                value: '3',
                                                label: 'Value 3',
                                            },
                                        ]}
                                        // inputRef={ref}
                                        {...fieldRest}
                                    />
                                )}
                            />

                        </Section>

                        <Section
                            title="Slider ✅"
                        >

                            <ControlledFormRow
                                name="slider"
                                label="Slider"
                                control={control}
                                renderField={({ field: { ref, ...fieldRest }, id }) => (
                                    <Slider
                                        id={id}
                                        // inputRef={ref}
                                        sx={{ my: .5 }}
                                        {...fieldRest}
                                    />
                                )}
                            />

                            <ControlledFormRow
                                name="slider"
                                label="Slider"
                                control={control}
                                renderField={({ field: { ref, ...fieldRest }, id }) => (
                                    <Slider
                                        id={id}
                                        // inputRef={ref}
                                        iconStart={<VolumeDown />}
                                        iconEnd={<VolumeUp />}
                                        stackProps={{
                                            sx: { mt: 1 },
                                        }}
                                        {...fieldRest}
                                    />
                                )}
                            />

                        </Section>

                        <Section
                            title="Wysiwyg ❌"
                        >

                            <ControlledFormRow
                                name="wysiwyg"
                                label="Wysiwyg"
                                control={control}
                                renderField={({ field: { ref, ...fieldRest }, id }) => (
                                    <Wysiwyg
                                        // id={id}
                                        // inputRef={ref}
                                        {...fieldRest}
                                    />
                                )}
                                helpers={[ 'Some text helper' ]}
                                errors={[ 'Some error text' ]}
                            />

                        </Section>

                        <Section
                            title="Toggle ✅"
                        >

                            <ControlledFormRow
                                name="toggle"
                                label="Toggle"
                                control={control}
                                renderField={({ field: { ref, ...fieldRest }, id }) => (
                                    <Toggle
                                        id={id}
                                        // inputRef={ref}
                                        size="small"
                                        sx={{ mt: .5 }}
                                        items={[
                                            {
                                                id: 'g4.1',
                                                value: '1',
                                                children: 'Value 1',
                                            },
                                            {
                                                id: 'g4.2',
                                                value: '2',
                                                children: 'Value 2',
                                            },
                                            {
                                                id: 'g4.3',
                                                value: '3',
                                                children: 'Value 3',
                                            },
                                        ]}
                                        {...fieldRest}
                                    />
                                )}
                            />

                        </Section>

                        <Section
                            title="Pickers ❌"
                        >

                            pickers ... tag picker

                        </Section>

                    </Stack>
                    <Box
                        sx={{
                            my: 2,
                        }}
                    >
                        <FormRow
                            emptyLabel
                        >
                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                                justifyContent="flex-start"
                            >
                                <Button
                                    secondary
                                >
                                    revert changes
                                </Button>
                                <Button
                                    submit
                                >
                                    update changes
                                </Button>
                            </Stack>
                        </FormRow>
                    </Box>
                    <Divider />
                    <Code
                        json={formValues}
                        sx={{
                            my: 2,
                        }}
                    />
                </>
            </Form>
        </>
    );
};

export default UiDemoForm;
