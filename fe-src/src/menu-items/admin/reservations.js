// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const reservations = {
    id: 'reservations-group',
    type: 'group',
    children: [
        {
            id: 'reservations',
            title: 'Reservations',
            type: 'item',
            url: '/admin/reservations',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default reservations;
