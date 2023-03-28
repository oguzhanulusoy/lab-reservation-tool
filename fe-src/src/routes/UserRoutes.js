import { lazy } from 'react';

// project imports
import UserLayout from 'layout/UserLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/user/sample-page')));
const SamplePage2 = Loadable(lazy(() => import('views/user/sample-page2')));

const Dashboard = Loadable(lazy(() => import('views/user/dashboard')));
const Dashboard2 = Loadable(lazy(() => import('views/user/dashboard2')));
const NewReservationPage = Loadable(lazy(() => import('views/user/newReservationPage')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/user/',
    element: <UserLayout />,
    children: [
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'sample-page2',
            element: <SamplePage2 />
        },
        {
            path: '/user/reservations',
            element: <Dashboard />
        },
        {
            path: '/user/servers',
            element: <Dashboard2 />
        },
        {
            path: '/user/newReservation',
            element: <NewReservationPage />
        }
    ]
};

export default MainRoutes;
