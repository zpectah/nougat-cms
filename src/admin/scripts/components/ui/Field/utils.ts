import React from 'react';

export const checkboxCommonFocusHandler = (e: React.FocusEvent<HTMLButtonElement>, stateValue?: any, callback?: any) => {
    if (stateValue && callback) callback(stateValue, e);
};

export const toggleArrayItem = (
    array: (string | number)[],
    payload: string | number,
) => {
    let item = payload;
    let arrayTmp: (string | number)[] = [];
    if (array) {
        arrayTmp = [ ...array ];
        const index = arrayTmp.indexOf(item);
        if (index > -1) {
            arrayTmp.splice(index, 1);
        } else {
            arrayTmp.push(item);
        }
    }

    return arrayTmp;
};
