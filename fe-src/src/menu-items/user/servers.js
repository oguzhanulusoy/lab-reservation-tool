import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

const servers = {
    id: 'servers-group',
    type: 'group',
    children: [
        {
            id: 'servers',
            title: 'Servers',
            type: 'item',
            url: '/user/servers',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
}

export default servers;