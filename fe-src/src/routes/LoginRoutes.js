import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';

// sample page routing
const LoginPage = Loadable(lazy(() => import('views/user/authentication/Login')));
// ==============================|| MAIN ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    children: [
        {
            path: 'login',
            element: <LoginPage />
        }
    ]
};

export default LoginRoutes;
