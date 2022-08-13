import React from 'react';

import { Login } from '../modules/Login';
import { ViewLayout } from '../components';

const LoginView = () => (
    <ViewLayout
        name="Login"
        variant="minimal"
        children={<Login />}
    />
);

export default LoginView;
