import React from 'react';

import palette from '../../../styles/palette';
import { Backdrop, BackdropProps } from '../Backdrop';
import { Preloader, PreloaderProps } from '../Preloader';

type BackdropPreloaderBaseProps = {
    node?: React.ReactNode,
    open?: boolean,
    variant?: PreloaderProps['variant'],
    preloaderProps?: PreloaderProps,
}
export type BackdropPreloaderProps = Partial<BackdropProps> & BackdropPreloaderBaseProps

const BackdropPreloader = (props: BackdropPreloaderProps) => {
    const {
        node,
        open = true,
        variant,
        preloaderProps,
        ...rest
    } = props;

    return (
        <>
            <Backdrop
                sx={{
                    color: palette.light,
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
                {...rest}
            >
                {node ? (
                    <>{node}</>
                ) : (
                    <Preloader
                        circularProps={{
                            color: 'inherit',
                        }}
                        linearProps={{
                            color: 'inherit',
                        }}
                        {...preloaderProps}
                    />
                )}
            </Backdrop>
        </>
    );
};

export default BackdropPreloader;
