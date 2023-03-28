// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

const newReservation = {
    id: 'new-reservation',
    type: 'group',
    children: [
        {
            id: 'newReservation',
            title: 'New Reservation',
            type: 'item',
            url: '/admin/newReservation',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default newReservation;