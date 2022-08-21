import React, { useMemo } from 'react';
import { merge } from 'lodash';
import {
    Box,
    Grid,
    GridProps,
} from '@mui/material';

import { getToken } from '../../../utils';
import { HelperText, HelperTextProps } from '../HelperText';
import FormLabel, { FormLabelProps } from './FormLabel';
import { FormRowVariantKeys } from './enums';
import { FormRowVariantTypes } from './types';

export type FormRowRenderProps = {
    id: string,
}
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
    render?: (props: FormRowRenderProps) => React.ReactNode,
    emptyLabel?: boolean,
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
        render,
        emptyLabel,
    } = props;

    const uid = id || getToken();

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
                        sx: merge({
                            alignItems: 'center',
                            justifyContent: {
                                xs: 'flex-start',
                            },
                        }, gridLabelBaseSx),
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
                        sx: merge({
                            alignItems: 'flex-start',
                            justifyContent: {
                                xs: 'flex-end',
                            },
                        }, gridLabelBaseSx),
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
                        sx: merge({
                            alignItems: {
                                xs: 'center',
                                md: 'flex-start',
                            },
                            justifyContent: {
                                xs: 'flex-start',
                                md: 'flex-end',
                            },
                        }, gridLabelBaseSx),
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
        const elProps = merge(gridLayout.label, gridLabelProps);
        if (label || emptyLabel) return (
            <Grid
                item
                {...elProps}
            >
                <FormLabel
                    htmlFor={uid}
                    required={required}
                    sx={merge({
                        pt: 1.45,
                    }, labelProps?.sx)}
                    {...labelProps}
                >
                    {label && label}
                    {emptyLabel && (
                        <>&nbsp;</>
                    )}
                </FormLabel>
            </Grid>
        );
    }, [
        label,
        gridLayout,
        gridLabelProps,
        required,
        uid,
        labelProps,
        emptyLabel,
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
        const elProps = merge(gridLayout.field, gridFieldProps);
        return (
            <Grid
                item
                {...elProps}
            >
                <Box
                    sx={{
                        width: '100%',
                    }}
                >
                    {children}
                    {render && render({ id: uid })}
                </Box>
                {renderMessages}
            </Grid>
        );
    }, [
        uid,
        render,
        children,
        renderMessages,
        gridLayout,
        gridFieldProps,
    ]);

    return (
        <Grid
            container
            spacing={2}
            {...merge({
                sx: {
                    mb: {
                        xs: 1,
                        md: 2,
                    },
                },
            }, gridContainerProps)}
        >
            {renderLabel}
            {renderField}
        </Grid>
    );
};

export default FormRow;
