import React from 'react';
import { Slider, SliderProps } from '@mui/material';

type SliderBasePublicProps = {}
export type SliderBaseProps = SliderProps & SliderBasePublicProps

const SliderBase = (props: SliderBaseProps) => {
    const { ...rest } = props;

    return (
        <Slider
            {...rest}
        />
    );
};

export default SliderBase;
