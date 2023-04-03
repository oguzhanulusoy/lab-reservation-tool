import { lazy } from 'react';

// project imports
import UserLayout from 'layout/UserLayout';
import Loadable from 'ui-component/Loadable';

const Reservations = Loadable(lazy(() => import('views/user/reservations')));
const Servers = Loadable(lazy(() => import('views/user/servers')));
const NewReservationPage = Loadable(lazy(() => import('views/user/newReservationPage')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/user/',
    element: <UserLayout />,
    children: [
        {
            path: '/user/reservations',
            element: <Reservations />
        },
        {
            path: '/user/servers',
            element: <Servers />
        },
        {
            path: '/user/newReservation',
            element: <NewReservationPage />
        }
    ]
};

export default MainRoutes;
