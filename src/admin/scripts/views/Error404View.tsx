import React from 'react';

import { Error404 } from '../modules/Error';
import { ViewLayout } from '../components';

const Error404View = () => (
    <ViewLayout
        name="Error404"
        variant="minimal"
        children={<Error404 />}
        centered
        containerProps={{
            maxWidth: 'md',
        }}
    />
);

export default Error404View;
