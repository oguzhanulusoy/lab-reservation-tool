import MUIDataTable from "mui-datatables";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ServiceCaller from 'services/ServiceCaller';
import ReservationService from "services/reservation/ReservationService";
import AdminReservationsConfig from "configs/admin/adminReservationsConfig.js";

function ReservationSettings() {
  const [rows, setRows] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const handleButton = (path) => {
    sendRequest(path)
    navigate("/newReservation")
  }
  
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

  const columns = AdminReservationsConfig.AdminReservationColumns;

  const options = {
    filterType: 'checkbox',
    onRowSelectionChange: (currentSelect, allSelected) => {
      const result = allSelected.map(item => { return rows.at(item.index) });
      const selectedIds = result.map(item => {
        return item.id;
      });
      console.log(selectedIds);
    },
    //onRowsDelete:()=>{handleDelete()},
  }

  const getData = () => {
    let serviceCaller = new ServiceCaller();
    ReservationService.getReservations(serviceCaller, '').then((res) => {
      console.log(res)
      setIsLoaded(true);
      setRows(res.data);
    }).catch((error) => {
      console.log(error)
      setIsLoaded(true);
      setError(error);
    })
  }

  useEffect(() => {
    getData()
  }, [])

  if (error) {
    return <div> Error !!!</div>;
  } else if (!isLoaded) {
    return <div> Loading... </div>;
  }
  else {
    return (
      <ThemeProvider theme={getMuiTheme()}>
        <Button  onClick={() => handleButton()}  variant="outlined" style={{ margin: 8, backgroundColor: "white", color: "black", borderColor: "white", textTransform: 'none' }}><AddCircleOutlineIcon></AddCircleOutlineIcon></Button>
        <MUIDataTable title="Reservations" columns={columns} data={rows} options={options} />
      </ThemeProvider>
    )
  }
}

export default ReservationSettings;
