import React from 'react';

import { useSidebar } from '../../../hooks';
import { IconButton } from '../../ui';

type SidebarToggleBaseProps = {
    children?: React.ReactNode,
}
export type SidebarToggleProps = SidebarToggleBaseProps

const SidebarToggle: React.FC<SidebarToggleProps> = (props) => {
    const { children } = props;

    const { toggleSidebar } = useSidebar();

    return (
        <IconButton
            onClick={() => toggleSidebar()}
            color="inherit"
        >
            {children}
        </IconButton>
    );
};

export default SidebarToggle;
