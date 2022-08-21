import React, { useCallback, useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { FormGroup, FormGroupProps } from '@mui/material';

import CheckboxLabel, { CheckboxLabelProps } from './CheckboxLabel';
import { checkboxCommonValueType, radioCommonValueType, optionItemCommonProps } from '../types';
import { toggleArrayItem, checkboxCommonFocusHandler } from '../utils';

type CheckboxGroupBaseProps = {
    items?: (optionItemCommonProps & CheckboxLabelProps)[],
    value?: checkboxCommonValueType,
    onChange?: (value: checkboxCommonValueType) => void,
    onFocus?: (value: checkboxCommonValueType, e: React.FocusEvent<HTMLButtonElement>) => void,
    onBlur?: (value: checkboxCommonValueType, e: React.FocusEvent<HTMLButtonElement>) => void,
}
export type CheckboxGroupProps = FormGroupProps & CheckboxGroupBaseProps

const CheckboxGroup = (props: CheckboxGroupProps) => {
    const {
        items = [],
        value,
        onChange,
        onFocus,
        onBlur,
        id,
        ...rest
    } = props;

    const [ stateValue, setStateValue ] = useState<checkboxCommonValueType>([]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let tmpValue = cloneDeep(stateValue);
        tmpValue = toggleArrayItem(tmpValue, e.target.value || e.currentTarget.value);
        setStateValue(tmpValue);
        onChange && onChange(tmpValue);
    };
    const focusHandler = useCallback((e: React.FocusEvent<HTMLButtonElement>) => checkboxCommonFocusHandler(e, stateValue, onFocus), [ stateValue ]);
    const blurHandler = useCallback((e: React.FocusEvent<HTMLButtonElement>) => checkboxCommonFocusHandler(e, stateValue, onBlur), [ stateValue ]);
    const isChecked = useCallback((val: radioCommonValueType) => stateValue.indexOf(val) > -1, [ stateValue ]);

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
                    <CheckboxLabel
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

export default CheckboxGroup;
