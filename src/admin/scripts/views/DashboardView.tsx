import React from 'react';

import { Dashboard } from '../modules/Dashboard';
import { ViewLayout } from '../components';

const DashboardView = () => {

    return (
        <ViewLayout
            name="Dashboard"
            children={<Dashboard />}
        />
    );
};

export default DashboardView;
