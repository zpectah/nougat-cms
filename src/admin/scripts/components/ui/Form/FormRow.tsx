import React, { useMemo } from 'react';
import {
    Box,
    Grid,
    FormLabel,
    GridProps,
    FormLabelProps,
} from '@mui/material';

import { HelperText, HelperTextProps } from '../HelperText';
import { FormRowVariantKeys } from './enums';
import { FormRowVariantTypes } from './types';

type gridLayoutProps = {
    label: GridProps,
    field: GridProps,
}
type FormRowBaseProps = {
    children?: React.ReactNode,
    label?: string,
    labelProps?: FormLabelProps,
    variant?: FormRowVariantTypes,
    id?: string,
    required?: boolean,
    helpers?: string[],
    errors?: string[],
    helperTextProps?: HelperTextProps,
    errorTextProps?: HelperTextProps,
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
        variant = FormRowVariantKeys['responsive'],
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
        const gridLabelBaseSx = {
            display: 'flex',
        };
        const gridFieldBaseSx = {
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'column',
        };
        switch (variant) {

            case FormRowVariantKeys['column']:
                return {
                    label: {
                        xs: 12,
                        sx: {
                            alignItems: 'center',
                            justifyContent: {
                                xs: 'flex-start',
                            },
                            ...gridLabelBaseSx,
                        },
                    },
                    field: {
                        xs: 12,
                        sx: {
                            ...gridFieldBaseSx,
                        },
                    },
                };

            case FormRowVariantKeys['row']:
                return {
                    label: {
                        xs: 6,
                        md: 5,
                        lg: 4,
                        xl: 3,
                        sx: {
                            alignItems: 'flex-start',
                            justifyContent: {
                                xs: 'flex-end',
                            },
                            ...gridLabelBaseSx,
                        },
                    },
                    field: {
                        xs: 6,
                        md: 7,
                        lg: 8,
                        xl: 9,
                        sx: {
                            ...gridFieldBaseSx,
                        },
                    },
                };

            case FormRowVariantKeys['responsive']:
            default:
                return {
                    label: {
                        xs: 12,
                        md: 5,
                        lg: 4,
                        xl: 3,
                        sx: {
                            alignItems: {
                                xs: 'center',
                                md: 'flex-start',
                            },
                            justifyContent: {
                                xs: 'flex-start',
                                md: 'flex-end',
                            },
                            ...gridLabelBaseSx,
                        },
                    },
                    field: {
                        xs: 12,
                        md: 7,
                        lg: 8,
                        xl: 9,
                        sx: {
                            ...gridFieldBaseSx,
                        },
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
                    sx={{
                        pt: 1.45,
                    }}
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
                    pb: 1.5,
                }}
            >
                {helpers.map((text) => (
                    <HelperText
                        key={text}
                        {...helperTextProps}
                    >
                        {text}
                    </HelperText>
                ))}
                {errors.map((text) => (
                    <HelperText
                        key={text}
                        error
                        {...errorTextProps}
                    >
                        {text}
                    </HelperText>
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
