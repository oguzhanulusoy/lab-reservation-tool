import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

export default {
    options: {
        filterType: 'dropdown',
        selectableRows: 'none',
        enableNestedDataAccess: '.'
    },

    style: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #FFFFFF',
        boxShadow: 24,
        p: 2,
    },

    AdminUsersColumns: [
        {
            name: 'firstName',
            label: 'First Name',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: 'lastName',
            label: 'Last Name',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: 'username',
            label: 'Username',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: 'email',
            label: 'Email',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: 'roleId.roleName',
            label: 'Role',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: 'edit',
            label: 'Edit',
            options: {
                filter: false,
                sort: false,
                customBodyRenderLite: (dataIndex) => {
                    return (
                        <Button aria-label="edit" onClick={() => {}}>
                            <EditIcon style={{ color: '#9e9e9e' }}></EditIcon>
                        </Button>
                    );
                }
            }
        }
    ]
};
