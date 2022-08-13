import React from 'react';
import {
    IconButton as MuiIconButton,
    IconButtonProps as MuiIconProps,
    Tooltip,
    TooltipProps,
} from '@mui/material';

type IconButtonBaseProps = {
    tooltip?: string,
    tooltipProps?: TooltipProps,
}
export type IconButtonProps = IconButtonBaseProps & MuiIconProps

const IconButton = (props: IconButtonProps) => {
    const {
        tooltip,
        tooltipProps,
        ...rest
    } = props;

    const button = (
        <MuiIconButton
            {...rest}
        />
    );

    if (tooltip) {
        return (
            <Tooltip
                title={tooltip}
                {...tooltipProps}
            >
                {button}
            </Tooltip>
        );
    }

    return button;
};

export default IconButton;
