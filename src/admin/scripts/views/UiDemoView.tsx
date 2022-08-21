import React from 'react';

import { UiDemo } from '../modules/UiDemo';
import { ViewLayout } from '../components';

const UiDemoView = () => (
    <ViewLayout
        name="UiDemo"
        children={<UiDemo />}
    />
);

export default UiDemoView;
