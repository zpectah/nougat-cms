import React, {useState} from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { IconButton } from '../../IconButton';
import OutlinedInput, { OutlinedInputProps } from './OutlinedInput';

type InputPasswordBaseProps = {
    defaultVisible?: boolean,
}
export type InputPasswordProps = OutlinedInputProps & InputPasswordBaseProps

const InputPassword = (props: InputPasswordProps) => {
    const {
        defaultVisible,
        ...rest
    } = props;

    const [ visible, setVisible ] = useState<boolean | undefined>(defaultVisible);

    const toggleVisibilityHandler = () => setVisible(!visible);

    return (
        <OutlinedInput
            type={visible ? 'text' : 'password'}
            size="small"
            fullWidth
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="Toggle password visibility"
                        edge="end"
                        size="small"
                        onClick={toggleVisibilityHandler}
                    >
                        {visible ? (
                            <VisibilityOffIcon />
                        ) : (
                            <VisibilityIcon />
                        )}
                    </IconButton>
                </InputAdornment>
            }
            {...rest}
        />
    );
};

export default InputPassword;
