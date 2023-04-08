import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

export default {
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

    options: {
        filterType: 'dropdown',
        selectableRows: 'none',
        enableNestedDataAccess: '.'
    },

    UserServerColumns: [
        {
            name: "serverName",
            label: "Server Name",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "serverLocation",
            label: "Server Location",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "serverIp",
            label: "Server IP",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "serialNumber",
            label: "Serial Number",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "serverType",
            label: "Server Type",
            options: {
                filter: true,
                sort: true
            }
        }
    ]
}