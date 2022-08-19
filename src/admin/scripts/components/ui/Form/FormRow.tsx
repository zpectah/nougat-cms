import React, { useMemo } from 'react';
import {
    Box,
    Grid,
    FormLabel,
    FormHelperText,
    GridProps,
    FormLabelProps,
    FormHelperTextProps,
    SxProps,
} from '@mui/material';

type gridLayoutProps = {
    label: GridProps,
    field: GridProps,
}
type FormRowBaseProps = {
    children?: React.ReactNode,
    label?: string,
    labelProps?: FormLabelProps,
    variant?: 'column' | 'row' | 'responsive',
    id?: string,
    required?: boolean,
    helpers?: string[],
    errors?: string[],
    helperTextProps?: FormHelperTextProps,
    errorTextProps?: FormHelperTextProps,
    gridContainerProps?: GridProps,
    gridLabelProps?: GridProps,
    gridFieldProps?: GridProps,
}
export type FormRowProps = FormRowBaseProps

const FormRow: React.FC<FormRowProps> = (props) => {
    const {
        children,
        label,
        labelProps,
        variant = 'responsive',
        id,
        required,
        helpers = [],
        errors = [],
        helperTextProps,
        errorTextProps,
        gridContainerProps,
        gridLabelProps,
        gridFieldProps,
    } = props;

    const gridLayout: gridLayoutProps = useMemo(() => {
        switch (variant) {

            case 'column':
                return {
                    label: {
                        xs: 12,
                    },
                    field: {
                        xs: 12,
                    },
                };

            case 'row':
                return {
                    label: {
                        xs: 6,
                        md: 5,
                        lg: 4,
                        xl: 3,
                    },
                    field: {
                        xs: 6,
                        md: 7,
                        lg: 8,
                        xl: 9,
                    },
                };

            case 'responsive':
            default:
                return {
                    label: {
                        xs: 12,
                        md: 5,
                        lg: 4,
                        xl: 3,
                    },
                    field: {
                        xs: 12,
                        md: 7,
                        lg: 8,
                        xl: 9,
                    },
                };

        }
    }, [ variant ]);
    const renderLabel = useMemo(() => {
        if (label) return (
            <Grid
                item
                {...gridLayout.label}
                {...gridLabelProps}
            >
                <FormLabel
                    htmlFor={id}
                    required={required}
                    {...labelProps}
                >
                    {label}
                </FormLabel>
            </Grid>
        );
    }, [
        label,
        gridLayout,
        gridLabelProps,
        required,
        id,
        labelProps,
    ]);
    const renderMessages = useMemo(() => {
        const show = helpers.length > 0 || errors.length > 0;
        if (show) return (
            <Box
                sx={{
                    width: '100%',
                    py: 1,
                }}
            >
                {helpers.map((text) => (
                    <FormHelperText
                        key={text}
                        {...helperTextProps}
                    >
                        {text}
                    </FormHelperText>
                ))}
                {errors.map((text) => (
                    <FormHelperText
                        key={text}
                        error
                        {...errorTextProps}
                    >
                        {text}
                    </FormHelperText>
                ))}
            </Box>
        );
    }, [
        helpers,
        errors,
        helperTextProps,
        errorTextProps,
    ]);
    const renderField = useMemo(() => {
        return (
            <Grid
                item
                {...gridLayout.field}
                {...gridFieldProps}
            >
                <Box
                    sx={{
                        width: '100%',
                    }}
                >
                    {children}
                </Box>
                {renderMessages}
            </Grid>
        );
    }, [
        children,
        renderMessages,
        gridLayout,
        gridFieldProps,
    ]);

    return (
        <Grid
            container
            spacing={2}
            {...gridContainerProps}
        >
            {renderLabel}
            {renderField}
        </Grid>
    );
};

export default FormRow;
