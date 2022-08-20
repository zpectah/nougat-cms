import React, { useCallback, useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { FormGroup, FormGroupProps } from '@mui/material';

import SwitchLabel, { SwitchLabelProps } from './SwitchLabel';
import { toggleArrayItem } from '../utils';

type valueType = (string | number)[];
type SwitchGroupBaseProps = {
    items?: SwitchLabelProps[],
    value?: valueType,
    onChange?: (value: valueType) => void,
    onFocus?: (value: valueType, e: React.FocusEvent<HTMLButtonElement>) => void,
    onBlur?: (value: valueType, e: React.FocusEvent<HTMLButtonElement>) => void,
}
export type SwitchGroupProps = FormGroupProps & SwitchGroupBaseProps

const SwitchGroup = (props: SwitchGroupProps) => {
    const {
        items = [],
        value,
        onChange,
        onFocus,
        onBlur,
        ...rest
    } = props;

    const [ stateValue, setStateValue ] = useState<valueType>([]);

    const changeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        let val = cloneDeep(stateValue);
        val = toggleArrayItem(val, e.currentTarget.value);
        setStateValue(val);
    };
    const focusHandler = useCallback((e: React.FocusEvent<HTMLButtonElement>) => {
        if (onFocus) onFocus(stateValue, e);
    }, [ stateValue ]);
    const blurHandler = useCallback((e: React.FocusEvent<HTMLButtonElement>) => {
        if (onBlur) onBlur(stateValue, e);
    }, [ stateValue ]);

    useEffect(() => onChange && onChange(stateValue), [ stateValue ]);
    useEffect(() => {
        value && setStateValue(value);
    }, [ value ]);

    return (
        <FormGroup
            {...rest}
        >
            {items.map((item, index) => (
                <SwitchLabel
                    key={(item?.id || item?.name) || index}
                    onClick={changeHandler}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                    {...item}
                />
            ))}
        </FormGroup>
    );
};

export default SwitchGroup;
