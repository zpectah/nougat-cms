import React from 'react';
import { SvgIconProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import IconButton, { IconButtonProps } from './IconButton';

type CloseButtonBaseProps = {
    iconProps?: Partial<SvgIconProps>,
}
export type CloseButtonProps = CloseButtonBaseProps & IconButtonProps

const CloseButton = (props: CloseButtonProps) => {
    const {
        iconProps,
        ...rest
    } = props;

    return (
        <IconButton
            {...rest}
        >
            <CloseIcon
                {...iconProps}
            />
        </IconButton>
    );
};

export default CloseButton;
