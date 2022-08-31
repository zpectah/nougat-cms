import React, {useEffect, useRef, useState} from 'react';
import { Stack, Box } from '@mui/material';

import { IconButton } from '../../IconButton';
import { OutlinedInput, OutlinedInputProps } from '../Input';

type TagPickerBaseProps = {
    id?: string,
    value?: (string | number)[],
    onChange?: (value: (string | number)[]) => void,
    onFocus?: () => void,
    onBlur?: () => void,
    elementRef?: React.Ref<any>,
}
export type TagPickerProps = TagPickerBaseProps

const TagPicker = (props: TagPickerProps) => {
    const {
        id,
        value,
        onChange,
        onFocus,
        onBlur,
        elementRef,
    } = props;

    const [ newTag, setNewTag ] = useState('');
    const [ tmpValue, setTmpValue ] = useState<(string | number)[]>([]);
    const wrapper = useRef(elementRef);

    const changeNewValueHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const val = e.target.value;
        setNewTag(val);
    };
    const confirmNewValueHandler = () => {

        // TODO: add new tag value to array
        // TODO: clear field value

    };

    useEffect(() => {
        value && setTmpValue(value);
    }, []);

    return (
        <Stack
            id={id}
            direction="column"
            gap={2}
            ref={wrapper}
        >
            <Box>
                input ... #{id}
                <OutlinedInput
                    id={`input_${id}`}
                    type="text"
                    size="small"
                    fullWidth
                    value={newTag}
                    onChange={changeNewValueHandler}
                />
            </Box>
            <Box>
                tags list (chips)
            </Box>
        </Stack>
    );
};

export default TagPicker;
