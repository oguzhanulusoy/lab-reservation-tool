// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const reservations = {
    id: 'reservation-group',
    type: 'group',
    children: [
        {
            id: 'reservations',
            title: 'Reservations',
            type: 'item',
            url: '/user/reservations',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
        // {
        //     id: 'servers',
        //     title: 'Servers',
        //     type: 'item',
        //     url: '/admin/servers',
        //     icon: icons.IconDashboard,
        //     breadcrumbs: false
        // }
    ]
};

export default reservations;
