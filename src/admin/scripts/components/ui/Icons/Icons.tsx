import React from 'react';

import useIcons from './useIcons';
import { iconsTypes } from './types';

type IconsBaseProps = {
    image?: iconsTypes,
}
export type IconsProps = IconsBaseProps

const Icons = (props: IconsProps) => {
    const {} = props;

    const { ...icons } = useIcons();

    const image = { ...icons };

    if (image) {
        return image;
    }

    return (
        <></>
    );
};

export default Icons;
