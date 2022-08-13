import React from 'react';

import { Settings } from '../modules/Settings';
import { ViewLayout } from '../components';

const SettingsView = () => (
    <ViewLayout
        name="Settings"
        children={<Settings />}
    />
);

export default SettingsView;
