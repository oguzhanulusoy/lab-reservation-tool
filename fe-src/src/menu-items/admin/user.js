// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

const user = {
    id: 'user-group',
    type: 'group',
    children: [
        {
            id: 'user',
            title: 'Users',
            type: 'item',
            url: '/admin/users',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default user;