import React, { useCallback, useEffect, useState } from 'react';
import { FormGroup, FormGroupProps } from '@mui/material';

import RadioLabel, { RadioLabelProps } from './RadioLabel';
import { radioCommonValueType, optionItemCommonProps } from '../types';
import { checkboxCommonFocusHandler } from '../utils';

type RadioGroupBaseProps = {
    items?: (optionItemCommonProps & RadioLabelProps)[],
    value?: radioCommonValueType,
    onChange?: (value: radioCommonValueType) => void,
    onFocus?: (value: radioCommonValueType, e: React.FocusEvent<HTMLButtonElement>) => void,
    onBlur?: (value: radioCommonValueType, e: React.FocusEvent<HTMLButtonElement>) => void,
}
export type RadioGroupProps = FormGroupProps & RadioGroupBaseProps

const RadioGroup = (props: RadioGroupProps) => {
    const {
        items = [],
        value,
        onChange,
        onFocus,
        onBlur,
        id,
        ...rest
    } = props;

    const [ stateValue, setStateValue ] = useState<radioCommonValueType | null>(null);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let tmpValue = e.currentTarget.value;
        setStateValue(tmpValue);
        onChange && onChange(tmpValue);
    };
    const focusHandler = useCallback((e: React.FocusEvent<HTMLButtonElement>) => checkboxCommonFocusHandler(e, stateValue, onFocus), [ stateValue ]);
    const blurHandler = useCallback((e: React.FocusEvent<HTMLButtonElement>) => checkboxCommonFocusHandler(e, stateValue, onBlur), [ stateValue ]);
    const isChecked = useCallback((val: radioCommonValueType) => stateValue === val, [ stateValue ]);

    useEffect(() => {
        value && setStateValue(value);
    }, [ value ]);

    return (
        <FormGroup
            {...rest}
        >
            {items.map((item, index) => {
                const key = `${id}_${(item.id || item.key) || index}`;

                return (
                    <RadioLabel
                        key={key}
                        checked={isChecked(item.value as radioCommonValueType)}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                        onBlur={blurHandler}
                        {...item}
                    />
                );
            })}
        </FormGroup>
    );
};

export default RadioGroup;
