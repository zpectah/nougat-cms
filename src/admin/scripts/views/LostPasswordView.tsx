import React from 'react';

import { LostPassword } from '../modules/LostPassword';
import { ViewLayout } from '../components';

const LostPasswordView = () => (
    <ViewLayout
        name="LostPassword"
        variant="minimal"
        children={<LostPassword />}
        centered
        containerProps={{
            maxWidth: 'md',
        }}
    />
);

export default LostPasswordView;
