import React, { useCallback, useEffect, useState } from 'react';
import { FormGroup, FormGroupProps } from '@mui/material';

import RadioLabel, { RadioLabelProps } from './RadioLabel';

type valueType = string | number | null;
type RadioGroupBaseProps = {
    items?: RadioLabelProps[],
    value?: valueType,
    onChange?: (value: valueType) => void,
    onFocus?: (value: valueType, e: React.FocusEvent<HTMLButtonElement>) => void,
    onBlur?: (value: valueType, e: React.FocusEvent<HTMLButtonElement>) => void,
}
export type RadioGroupProps = FormGroupProps & RadioGroupBaseProps

const RadioGroup = (props: RadioGroupProps) => {
    const {
        items = [],
        value,
        onChange,
        onFocus,
        onBlur,
        ...rest
    } = props;

    const [ stateValue, setStateValue ] = useState<valueType>(null);

    const changeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        let val = e.currentTarget.value;
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
                <RadioLabel
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

export default RadioGroup;
