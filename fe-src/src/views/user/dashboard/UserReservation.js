import MUIDataTable from "mui-datatables";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import {Button} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Modal, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import UserService from 'services/users/UserService';
import ServiceCaller from 'services/ServiceCaller';
import ReservationService from "services/reservation/ReservationService";

function UserReservation() {
    const [rows, setRows] = useState([]);
    const [isLoaded, setIsLoaded]= useState(false);
    const [error, setError] = useState(null);
    const getMuiTheme = () =>
    createTheme({
        overrides: {
          MuiChip: {
            root: {
              backgroundColor: "grey"
            }
          }
        }
      });
    const columns = [
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
        // {
        //   name: "edit",
        //   label: "Edit",
        //   options: {
        //     filter: false,
        //     sort: false,
        //     customBodyRenderLite: (dataIndex) => {
        //       return (
        //           <Button aria-label="edit" onClick={()=>{}}><EditIcon style={{color:"#9e9e9e"}}></EditIcon></Button>
        //       );
        //    }
        //   }
        // }
      ];
    const options = {
        filterType: 'checkbox',
        onRowSelectionChange: (currentSelect, allSelected) => {                
          const result = allSelected.map(item => { return rows.at(item.index) });
          const selectedIds = result.map(item => {
               return item.id;
          }); 
          //console.log("Selected Array: ",selectedIds);
          console.log(selectedIds);
    },
    //onRowsDelete:()=>{handleDelete()},
    }
    const getData = () => {
        let serviceCaller = new ServiceCaller();
        ReservationService.getReservations(serviceCaller, '', (res) => {
            setIsLoaded(true);
            setRows(res);
        }, (error) => {
              console.log(error)
              setIsLoaded(true);
              setError(error);
        })
        //setRefresh(false);
      }
      useEffect(() => {
        getData()
      }, [])
    if(error) {
        return <div> Error !!!</div>;
    } else if(!isLoaded) {
        return <div> Loading... </div>;} 
      else {
    return (
        <ThemeProvider theme={getMuiTheme()}>
            <Button /* onClick={handleCreateOpen} */ variant="outlined" style={{margin:8, backgroundColor:"white", color:"black", borderColor:"white", textTransform: 'none'}}><AddCircleOutlineIcon></AddCircleOutlineIcon></Button>
            <MUIDataTable title="Reservations" columns={columns} data={rows} options={options} />
        </ThemeProvider>
  )}
}

export default UserReservation;
  