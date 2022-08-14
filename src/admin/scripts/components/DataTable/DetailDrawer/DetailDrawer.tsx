import React from 'react';

import { Drawer, DrawerProps } from '../../ui';

type DetailDrawerBaseProps = {}
export type DetailDrawerProps = DrawerProps & DetailDrawerBaseProps

const DetailDrawer: React.FC<DetailDrawerProps> = (props) => {
    const {
        children,
        ...rest
    } = props;

    return (
        <Drawer
            open
            anchor="right"
            width={350}
            {...rest}
        >
            {children}
        </Drawer>
    );
};

export default DetailDrawer;
