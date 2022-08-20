import React, { useMemo } from 'react';
import {
    Stack,
    StackProps,
} from '@mui/material';

import SliderBase, { SliderBaseProps } from './Slider.base';

type SliderPublicProps = {
    iconStart?: React.ReactNode,
    iconEnd?: React.ReactNode,
    stackProps?: StackProps,
}
export type SliderProps = SliderBaseProps & SliderPublicProps

const Slider = (props: SliderProps) => {
    const {
        iconStart,
        iconEnd,
        stackProps,
        ...rest
    } = props;

    const renderNode = useMemo(() => {
        return (
            <SliderBase
                {...rest}
            />
        );
    }, [ rest ]);

    if (iconStart || iconEnd) {
        return (
            <Stack
                {...stackProps}
            >
                {iconStart && iconStart}
                {renderNode}
                {iconEnd && iconEnd}
            </Stack>
        );
    }

    return (
        <>
            {renderNode}
        </>
    );
};

export default Slider;
