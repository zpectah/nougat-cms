import React from 'react';

import { Login } from '../modules/Login';
import { ViewLayout } from '../components';

const LoginView = () => (
    <ViewLayout
        name="Login"
        variant="minimal"
        children={<Login />}
        centered
        containerProps={{
            maxWidth: 'md',
        }}
    />
);

export default LoginView;
