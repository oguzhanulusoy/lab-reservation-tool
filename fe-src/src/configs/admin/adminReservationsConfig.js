import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

export default {
    AdminReservationColumns: [
        {
            name: "firstName",
            label: "First Name",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "lastName",
            label: "Last Name",
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
        }
    ]
}