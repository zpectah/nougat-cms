import React, { useMemo } from 'react';
import {
    CircularProgress,
    LinearProgress,
    CircularProgressProps,
    LinearProgressProps,
} from '@mui/material';

type PreloaderBaseProps = {
    variant?: 'circular' | 'linear',
    circularProps?: CircularProgressProps,
    linearProps?: LinearProgressProps,
}
export type PreloaderProps = PreloaderBaseProps

const Preloader = (props: PreloaderProps) => {
    const {
        variant = 'circular',
        circularProps,
        linearProps,
    } = props;

    return useMemo(() => {
        switch (variant) {

            case 'linear':
                return (
                    <LinearProgress {...linearProps} />
                );

            case 'circular':
                return (
                    <CircularProgress {...circularProps} />
                );

        }
    }, [ variant ]);
};

export default Preloader;
