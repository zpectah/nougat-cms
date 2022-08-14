import React from 'react';

import { Users } from '../modules/Users';
import { ViewLayout } from '../components';

const UsersView = () => (
    <ViewLayout
        name="Users"
        children={<Users />}
    />
);

export default UsersView;
