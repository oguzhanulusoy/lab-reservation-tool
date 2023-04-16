import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import Visibility from "@mui/icons-material/Visibility";

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
    
    UserReservationColumns: [
        {
            name: 'name',
            label: 'Full Name',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "serverName",
            label: "Server Name",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "reservationStartDate",
            label: "Reservation Start Date",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "reservationEndDate",
            label: "Reservation End Date",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "status",
            label: "Status",
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
                        <Button aria-label="edit" onClick={() => { }}><EditIcon style={{ color: "#9e9e9e" }}></EditIcon></Button>
                    );
                }
            }
        },
        {
            name: "showDescription",
            label: "Show Description",
            options: {
                filter: false,
                sort: false,
                customBodyRenderLite: (dataIndex) => {
                    return (
                        <Button aria-label="edit" onClick={() => { }}><Visibility style={{ color: "#9e9e9e" }}></Visibility></Button>
                    );
                }
            }
        }
    ]
}