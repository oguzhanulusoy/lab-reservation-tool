import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import AdminLayout from 'layout/AdminLayout';

// login option 3 routing
// dashboard routing
const Reservations = Loadable(lazy(() => import('views/admin/reservations')));
const Servers = Loadable(lazy(() => import('views/admin/servers')));
const UsersPage = Loadable(lazy(() => import('views/admin/users')));
const NewReservationPage = Loadable(lazy(() => import('views/admin/newReservationPage')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <AdminLayout />,
    children: [
        {
            path: '/admin/reservations',
            element: <Reservations />
        },
        {
            path: '/admin/servers',
            element: <Servers />
        },
        {
            path: '/admin/users',
            element: <UsersPage />
        },
        {
            path: '/admin/newReservation',
            element: <NewReservationPage />
        }
    ]
};

export default AuthenticationRoutes;
