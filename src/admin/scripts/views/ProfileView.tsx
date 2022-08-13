import React from 'react';

import { Profile } from '../modules/Profile';
import { ViewLayout } from '../components';

const ProfileView = () => (
    <ViewLayout
        name="Profile"
        children={<Profile />}
    />
);

export default ProfileView;
