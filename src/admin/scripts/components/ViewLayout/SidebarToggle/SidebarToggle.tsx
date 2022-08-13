import React from 'react';

import { useSidebar } from '../../../hooks';
import { IconButton, IconButtonProps } from '../../ui';

type SidebarToggleBaseProps = {
    children?: React.ReactNode,
}
export type SidebarToggleProps = SidebarToggleBaseProps & IconButtonProps

const SidebarToggle: React.FC<SidebarToggleProps> = (props) => {
    const { children, ...rest } = props;

    const { toggleSidebar } = useSidebar();

    return (
        <IconButton
            onClick={() => toggleSidebar()}
            color="inherit"
            {...rest}
        >
            {children}
        </IconButton>
    );
};

export default SidebarToggle;
