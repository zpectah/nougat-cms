import React from 'react';

export type radioCommonValueType = string | number;
export type checkboxCommonValueType = radioCommonValueType[];

export type optionItemCommonProps = {
    id?: string | number,
    value: radioCommonValueType,
    label?: React.ReactNode;
    children?: React.ReactNode,
};

