import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Book } from "@mui/icons-material";

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

    AdminServerColumns: [
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
        },
        {
            name: "edit",
            label: "Edit",
            options: {
                filter: false,
                sort: false,
                customBodyRenderLite: (dataIndex) => {
                    return (
                        <Button aria-label="edit" onClick={()=>{}}><EditIcon style={{color:"#9e9e9e"}}></EditIcon></Button>
                    );
                }
            }
        },
        {
            name: "bookNow",
            label: "Book Now",
            options: {
                filter: false,
                sort: false,
                customBodyRenderLite: (dataIndex) => {
                    return (
                        <Button aria-label="edit" onClick={()=>{}}><Book style={{color:"#9e9e9e"}}></Book></Button>
                    );
                }
            }
        }
    ]
}