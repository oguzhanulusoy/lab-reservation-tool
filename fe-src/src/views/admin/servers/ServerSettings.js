import MUIDataTable from "mui-datatables";
import { createTheme } from "@mui/material";
import { ThemeProvider, Modal, Box, Button, FormControl, 
  InputLabel, Select, MenuItem, Card, CardHeader, 
  CardContent, CardActions, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AdminServersConfig from 'configs/admin/adminServersConfig.js';
import ServiceCaller from 'services/ServiceCaller';
import ServerService from "services/servers/ServerService";

function ServerSettings() {
  const [rows, setRows] = useState([]);
  const [isLoaded, setIsLoaded]= useState(false);
  const [error, setError] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [server, setServer] = useState({
    serverName: "",
    serverLocation: "",
    serverIp: "",
    serialNumber: "",
    serverType: "",
    isHost: true,
  });

  const getMuiTheme = () =>
    createTheme({
      overrides: {
        MuiChip: {
          root: {
            backgroundColor: "black"
          }
        }
      }
    });

  const handleCreateChange = (event) => {
    setServer({ ...server, [event.target.name]: event.target.value });
  };

  const handleCreateOpen = () => {
    setCreateOpen(true);
  };

  const handleCreateClose = () => {
    setCreateOpen(false);
    setServer({
      serverName: "",
      serverLocation: "",
      serverIp: "",
      serialNumber: "",
      serverType: "",
      isHost: true,
    });
  };

  const columns = AdminServersConfig.AdminServerColumns; 

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
    ServerService.getServers(serviceCaller, '').then((result) => {
      setIsLoaded(true);
      setRows(result.data);
    }).catch((err) => {
      console.log(err)
      setIsLoaded(true);
      setError(err);
    });
  }

  const validateIpAddress = (IP) => {
    const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
    return regexExp.test(IP)
  }

  const validateInputs = () => {
    const isValidIp = validateIpAddress(server.serverIp);
    if (!isValidIp) {
      toast.error("Invalid IP Address", { autoClose: 1000 });
      return false;
    } else if (server.serverName === "") {
      toast.error("Server Name is required", { autoClose: 1000 });
      return false;
    } else if (server.serverLocation === "") {
      toast.error("Server Location is required", { autoClose: 1000 });
      return false;
    } else if (server.serialNumber === "") {
      toast.error("Serial Number is required", { autoClose: 1000 });
      return false;
    } else if (server.serverType === "") {
      toast.error("Server Type is required", { autoClose: 1000 });
      return false;
    } 
    return true;
  }

  const handleCreateServer = () => {
    if (!validateInputs()) return

    const requestBody = {...server};
    let serviceCaller = new ServiceCaller();
    ServerService.addServer(serviceCaller, requestBody).then((result) => {
      toast.success("Server added successfully", { autoClose: 1000 });
      handleCreateClose();
      getData();
    }).catch((err) => {
      console.log(err)
      toast.error("Error while adding server", { autoClose: 1000 });
    });
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
      <div>
        <Modal
          open={createOpen}
          onClose={handleCreateClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={AdminServersConfig.style}>
            <Card sx={{ margin: 2, maxWidth: 500 }}>
              <CardHeader align="center" title="Add Server"
              />
              <CardContent align="center">
                <TextField name="serverName" id="outlined-basic" label="Server Name" variant="outlined" value={server.serverName}
                  onChange={(i) => handleCreateChange(i)} />

                <TextField name="serverLocation" id="outlined-basic" label="Server Location" variant="outlined" value={server.serverLocation}
                  onChange={(i) => handleCreateChange(i)} sx={{ mt: 2}} />
                
                <TextField name="serverIp" id="outlined-basic" label="Server IP" variant="outlined" value={server.serverIp}
                  onChange={(i) => handleCreateChange(i)} sx={{ mt: 2}} />

                <TextField name="serialNumber" id="outlined-basic" label="Serial Number" variant="outlined" value={server.serialNumber}
                  onChange={(i) => handleCreateChange(i)} sx={{ mt: 2}} />

                <TextField name="serverType" id="outlined-basic" label="Server Type" variant="outlined" value={server.serverType}
                  onChange={(i) => handleCreateChange(i)} sx={{ mt: 2}} />

                <div>
                  <FormControl sx={{ mt: 2, minWidth: 230 }}>
                    <InputLabel id="demo-simple-select-helper-label">Is Host</InputLabel>
                    <Select
                      name="isHost"
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={server.isHost}
                      label="Is Host"
                      onChange={(i) => handleCreateChange(i)}
                    >
                      <MenuItem key={"true"} value={"true"}>True</MenuItem>
                      <MenuItem key={"false"} value={"false"}>False</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <Button variant="outlined" style={{ marginTop: 15, maxWidth: 120, minWidth: 120 }} onClick={() => handleCreateServer()}>Add</Button>
                </div>

                <Typography variant="body2" color="text.secondary" align="left">
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
              </CardActions>
            </Card>
          </Box>
        </Modal>
      </div>
      <Button onClick={handleCreateOpen} variant="outlined" style={{margin:8, backgroundColor:"white", color:"black", borderColor:"white", textTransform: 'none'}}><AddCircleOutlineIcon></AddCircleOutlineIcon></Button>
      
      <MUIDataTable title="Servers" columns={columns} data={rows} options={options} />
    </ThemeProvider>
  )}
}

export default ServerSettings;