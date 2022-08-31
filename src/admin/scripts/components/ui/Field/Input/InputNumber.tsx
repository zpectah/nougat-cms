import React, { useRef } from 'react';
import { InputAdornment, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { IconButton } from '../../IconButton';
import OutlinedInput, { OutlinedInputProps } from './OutlinedInput';

const StyledInput = styled(OutlinedInput)(({ theme }) => `
    & input::-webkit-outer-spin-button,
    & input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    & input[type=number] {
      -moz-appearance: textfield;
    }
`);

type InputNumberBaseProps = {
    min?: number,
    max?: number,
    step?: number,
}
export type InputNumberProps = OutlinedInputProps & InputNumberBaseProps

const InputNumber = (props: InputNumberProps) => {
    const {
        min,
        max,
        step,
        inputRef,
        ...rest
    } = props;

    const field = useRef(inputRef);
    const fieldElement: any = field.current;

    const valueHandler = (method: 'inc' | 'dec') => {
        switch (method) {

            case 'inc':
                fieldElement.stepUp();
                break;

            case 'dec':
                fieldElement.stepDown();
                break;

        }
    };

    return (
        <StyledInput
            type="number"
            size="small"
            fullWidth
            inputRef={field}
            inputProps={{ min, max, step }}
            startAdornment={
                <InputAdornment position="start">
                    <IconButton
                        aria-label="Decrease value"
                        edge="start"
                        size="small"
                        onClick={() => valueHandler('dec')}
                    >
                        <RemoveIcon />
                    </IconButton>
                </InputAdornment>
            }
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="Increase value"
                        edge="end"
                        size="small"
                        onClick={() => valueHandler('inc')}
                    >
                        <AddIcon />
                    </IconButton>
                </InputAdornment>
            }
            {...rest}
        />
    );
};

export default InputNumber;
