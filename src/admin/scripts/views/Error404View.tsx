import React from 'react';

import { Error404 } from '../modules/Error';
import { ViewLayout } from '../components';

const Error404View = () => {

    return (
        <ViewLayout
            variant="minimal"
        >
            <Error404 />
        </ViewLayout>
    );
};

export default Error404View;
