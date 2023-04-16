import MUIDataTable from 'mui-datatables';
import { createTheme } from '@mui/material';

import {
    ThemeProvider,
    Modal,
    Box,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    TextField,
    Typography
} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import { Book } from "@mui/icons-material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AdminServersConfig from 'configs/admin/adminServersConfig.js';
import ServiceCaller from 'services/ServiceCaller';
import ServerService from 'services/servers/ServerService';
import ReservationService from 'services/reservation/ReservationService';

function ServerSettings() {
    const date = new Date();
    const [rows, setRows] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [createOpen, setCreateOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [reservationOpen, setReservationOpen] = useState(false);
    const [selectedIdList, setSelectedIdList] = useState([]);
    const [toUpdate, setToUpdate] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [server, setServer] = useState({
        serverName: '',
        serverLocation: '',
        serverIp: '',
        serialNumber: '',
        serverType: '',
        isHost: true
    });
    const [reservation, setReservation] = useState({
        userId: '',
        serverId: '',
        reservationStartDate: dayjs(date.getTime()),
        reservationEndDate: dayjs(date.getTime() + 86400000),
        description: ''
    })

    const getMuiTheme = () =>
        createTheme({
            overrides: {
                MuiChip: {
                    root: {
                        backgroundColor: 'black'
                    }
                }
            }
        });

    const onInputChangeReservation = (e) => {
        setReservation({ ...reservation, [e.target.name]: e.target.value });
    }

    const handleReservationOpen = () => {
        setReservationOpen(true);
    };

    const handleReservationClose = () => {
        setReservationOpen(false);
        setReservation({
            userId: '',
            serverId: '',
            reservationStartDate: dayjs(date.getTime()),
            reservationEndDate: dayjs(date.getTime() + 86400000),
            description: ''
        });
    }

    const onInputChange = (event) => {
        setServer({ ...server, [event.target.name]: event.target.value });
    };

    const clearServer = () => {
        setServer({
            serverName: '',
            serverLocation: '',
            serverIp: '',
            serialNumber: '',
            serverType: '',
            isHost: true
        });
    };

    const loadServer = (id) => {
        const arr = rows.filter((row) => row.id === id);
        setServer({
            serverName: arr[0].serverName,
            serverLocation: arr[0].serverLocation,
            serverIp: arr[0].serverIp,
            serialNumber: arr[0].serialNumber,
            serverType: arr[0].serverType,
            isHost: arr[0].isHost
        });
    };

    const handleCreateOpen = () => {
        setCreateOpen(true);
    };

    const handleCreateClose = () => {
        setCreateOpen(false);
        clearServer();
    };

    const handleUpdateOpen = () => {
        setUpdateOpen(true);
    };

    const handleUpdateClose = () => {
        setUpdateOpen(false);
        clearServer();
    };

    const columns = AdminServersConfig.AdminServerColumns;
    columns[columns.length - 2].options.customBodyRenderLite = (dataIndex) => {
        return (
            <Button
                aria-label="edit"
                onClick={() => {
                    handleUpdateOpen();
                    loadServer(rows[dataIndex].id);
                    setToUpdate(rows[dataIndex].id);
                }}
            >
                <EditIcon style={{ color: '#9e9e9e' }}></EditIcon>
            </Button>
        );
    };

    columns[columns.length - 1].options.customBodyRenderLite = (dataIndex) => {
        return (
            <Button
                aria-label="edit"
                onClick={() => {
                    handleReservationOpen();
                    loadSelectedServer(rows[dataIndex].id)
                }}
            >
                <Book style={{ color: '#9e9e9e' }}></Book>
            </Button>
        )
    }

    const loadSelectedServer = (id) => {
        const row = rows.filter(row => row.id === id);
        setReservation({
            ...reservation, serverId: row[0].id
        })
    }

    const options = {
        filterType: 'checkbox',
        onRowSelectionChange: (currentSelect, allSelected) => {
            const result = allSelected.map((item) => {
                return rows.at(item.index);
            });
            const selectedIds = result.map((item) => {
                return item.id;
            });
            setSelectedIdList(selectedIds);
        },
        onRowsDelete: () => {
            handleDeleteServers();
        }
    };

    const getSelectedServerReservationInfo = (serverId, userId) => {
        const m_reservations = reservations.filter(row => row.serverId === serverId && row.userId !== userId)
        return m_reservations
    }

    const validateReservationDate = (res) => {
        const startDate = new Date(res.reservationStartDate)
        const endDate = new Date(res.reservationEndDate)

        return startDate <= endDate;
    }

    const disableReservedDates = (date) => {
        const userId = parseInt(sessionStorage.getItem('userId'))
        const reservations = getSelectedServerReservationInfo(reservation.serverId, userId)
        for (const res of reservations) {
            const startDate = new Date(res.reservationStartDate)
            const endDate = new Date(res.reservationEndDate)

            if (date >= startDate && date <= endDate) return true
        }

        return false
    }

    const getData = () => {
        let serviceCaller = new ServiceCaller();
        ServerService.getServers(serviceCaller, '')
            .then((result) => {
                setIsLoaded(true);
                setRows(result.data);
            })
            .catch((err) => {
                console.log(err);
                setIsLoaded(true);
                setError(err);
            });
    };

    const getReservationsData = () => {
        const serviceCaller = new ServiceCaller();
        ReservationService.getReservations(serviceCaller, '')
            .then((result) => {
                setIsLoaded(true);
                setReservations(result.data);
            })
            .catch((err) => {
                console.log(err);
                setIsLoaded(true);
                setError(err);
            });
    }

    const validateIpAddress = (IP) => {
        const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
        return regexExp.test(IP);
    };

    const validateInputs = () => {
        const isValidIp = validateIpAddress(server.serverIp);
        if (!isValidIp) {
            toast.error('Invalid IP Address', { autoClose: 1000 });
            return false;
        } else if (server.serverName === '') {
            toast.error('Server Name is required', { autoClose: 1000 });
            return false;
        } else if (server.serverLocation === '') {
            toast.error('Server Location is required', { autoClose: 1000 });
            return false;
        } else if (server.serialNumber === '') {
            toast.error('Serial Number is required', { autoClose: 1000 });
            return false;
        } else if (server.serverType === '') {
            toast.error('Server Type is required', { autoClose: 1000 });
            return false;
        }
        return true;
    };

    const handleCreateServer = () => {
        if (!validateInputs()) return;

        const requestBody = { ...server };
        const serviceCaller = new ServiceCaller();
        ServerService.addServer(serviceCaller, requestBody)
            .then((result) => {
                toast.success('Server added successfully', { autoClose: 1000 });
                handleCreateClose();
                getData();
            })
            .catch((err) => {
                console.log(err);
                toast.error('Error while adding server', { autoClose: 1000 });
            });
    };

    const handleDeleteServers = () => {
        const requestBody = { ids: selectedIdList };
        const serviceCaller = new ServiceCaller();
        ServerService.deleteServers(serviceCaller, requestBody)
            .then((result) => {
                toast.success('Servers deleted successfully', { autoClose: 1000 });
                getData();
            })
            .catch((err) => {
                console.log(err);
                toast.error('Error while deleting servers', { autoClose: 1000 });
            });
    };

    const handleUpdateServer = () => {
        if (!validateInputs()) return;

        const requestBody = { ...server };
        const serviceCaller = new ServiceCaller();
        ServerService.updateServer(serviceCaller, requestBody, toUpdate)
            .then((result) => {
                toast.success('Server updated successfully', { autoClose: 1000 });
                handleUpdateClose();
                getData();
            })
            .catch((err) => {
                console.log(err);
                toast.error('Error while updating server', { autoClose: 1000 });
            });
    };

    const handleCreateReservation = () => {
        if (!validateReservationDate(reservation)) {
            toast.error('Reservation start date cannot be greater than end date.', { autoClose: 1000 });
            return;
        }

        const serviceCaller = new ServiceCaller();
        const requestBody = {
            ...reservation,
            userId: parseInt(sessionStorage.getItem('userId'))
        }

        ReservationService.addReservation(serviceCaller, requestBody)
            .then((result) => {
                toast.success('Reservation Successfully Created', { autoClose: 1000 });
                handleReservationClose();
                getReservationsData();
            })
            .catch((err) => {
                console.log(err);
                toast.error('Error while creating reservation', { autoClose: 1000 });
            });
    }

    useEffect(() => {
        getData();
        getReservationsData();
    }, []);

    if (error) {
        return <div> Error !!!</div>;
    } else if (!isLoaded) {
        return <div> Loading... </div>;
    } else {
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
                                <CardHeader align="center" title="Add Server" />
                                <CardContent align="center">
                                    <TextField
                                        name="serverName"
                                        id="outlined-basic"
                                        label="Server Name"
                                        variant="outlined"
                                        value={server.serverName}
                                        onChange={(i) => onInputChange(i)}
                                        sx={{ minWidth: 230 }}
                                    />

                                    <TextField
                                        name="serverLocation"
                                        id="outlined-basic"
                                        label="Server Location"
                                        variant="outlined"
                                        value={server.serverLocation}
                                        onChange={(i) => onInputChange(i)}
                                        sx={{ mt: 2, minWidth: 230 }}
                                    />

                                    <TextField
                                        name="serverIp"
                                        id="outlined-basic"
                                        label="Server IP"
                                        variant="outlined"
                                        value={server.serverIp}
                                        onChange={(i) => onInputChange(i)}
                                        sx={{ mt: 2, minWidth: 230 }}
                                    />

                                    <TextField
                                        name="serialNumber"
                                        id="outlined-basic"
                                        label="Serial Number"
                                        variant="outlined"
                                        value={server.serialNumber}
                                        onChange={(i) => onInputChange(i)}
                                        sx={{ mt: 2, minWidth: 230 }}
                                    />

                                    <TextField
                                        name="serverType"
                                        id="outlined-basic"
                                        label="Server Type"
                                        variant="outlined"
                                        value={server.serverType}
                                        onChange={(i) => onInputChange(i)}
                                        sx={{ mt: 2, minWidth: 230 }}
                                    />

                                    <div>
                                        <FormControl sx={{ mt: 2, minWidth: 230 }}>
                                            <InputLabel id="demo-simple-select-helper-label">Is Host</InputLabel>
                                            <Select
                                                name="isHost"
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                value={server.isHost}
                                                label="Is Host"
                                                onChange={(i) => onInputChange(i)}
                                            >
                                                <MenuItem key={'true'} value={'true'}>
                                                    True
                                                </MenuItem>
                                                <MenuItem key={'false'} value={'false'}>
                                                    False
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>

                                    <div>
                                        <Button
                                            variant="outlined"
                                            style={{ marginTop: 15, maxWidth: 120, minWidth: 120 }}
                                            onClick={() => handleCreateServer()}
                                        >
                                            Add
                                        </Button>
                                    </div>

                                    <Typography variant="body2" color="text.secondary" align="left"></Typography>
                                </CardContent>
                                <CardActions disableSpacing></CardActions>
                            </Card>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        open={updateOpen}
                        onClose={handleUpdateClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={AdminServersConfig.style}>
                            <Card sx={{ margin: 2, maxWidth: 500 }}>
                                <CardHeader align="center" title="Update Server" />
                                <CardContent align="center">
                                    <TextField
                                        name="serverName"
                                        id="outlined-basic"
                                        label="Server Name"
                                        variant="outlined"
                                        value={server.serverName}
                                        onChange={(i) => onInputChange(i)}
                                        sx={{ minWidth: 230 }}
                                    />

                                    <TextField
                                        name="serverLocation"
                                        id="outlined-basic"
                                        label="Server Location"
                                        variant="outlined"
                                        value={server.serverLocation}
                                        onChange={(i) => onInputChange(i)}
                                        sx={{ mt: 2, minWidth: 230 }}
                                    />

                                    <TextField
                                        name="serverIp"
                                        id="outlined-basic"
                                        label="Server IP"
                                        variant="outlined"
                                        value={server.serverIp}
                                        onChange={(i) => onInputChange(i)}
                                        sx={{ mt: 2, minWidth: 230 }}
                                    />

                                    <TextField
                                        name="serialNumber"
                                        id="outlined-basic"
                                        label="Serial Number"
                                        variant="outlined"
                                        value={server.serialNumber}
                                        onChange={(i) => onInputChange(i)}
                                        sx={{ mt: 2, minWidth: 230 }}
                                    />

                                    <TextField
                                        name="serverType"
                                        id="outlined-basic"
                                        label="Server Type"
                                        variant="outlined"
                                        value={server.serverType}
                                        onChange={(i) => onInputChange(i)}
                                        sx={{ mt: 2, minWidth: 230 }}
                                    />

                                    <div>
                                        <FormControl sx={{ mt: 2, minWidth: 230 }}>
                                            <InputLabel id="demo-simple-select-helper-label">Is Host</InputLabel>
                                            <Select
                                                name="isHost"
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                value={server.isHost}
                                                label="Is Host"
                                                onChange={(i) => onInputChange(i)}
                                            >
                                                <MenuItem key={'true'} value={'true'}>
                                                    True
                                                </MenuItem>
                                                <MenuItem key={'false'} value={'false'}>
                                                    False
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>

                                    <div>
                                        <Button
                                            variant="outlined"
                                            style={{ marginTop: 15, maxWidth: 140, minWidth: 140 }}
                                            onClick={() => handleUpdateServer()}
                                        >
                                            Update
                                        </Button>
                                    </div>

                                    <Typography variant="body2" color="text.secondary" align="left"></Typography>
                                </CardContent>
                                <CardActions disableSpacing></CardActions>
                            </Card>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        open={reservationOpen}
                        onClose={handleReservationClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={AdminServersConfig.style}>
                            <Card sx={{ margin: 2, maxWidth: 500 }}>
                                <CardHeader align="center" title="New Reservation" />
                                <CardContent align="center">
                                    <div>
                                        <FormControl sx={{ mt: 2, minWidth: 230 }}>
                                            <InputLabel id="demo-simple-select-helper-label">Server</InputLabel>
                                            <Select
                                                name="serverId"
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                value={reservation.serverId}
                                                label="Server"
                                                onChange={(e) => onInputChangeReservation(e)}
                                            >
                                                {rows.map((server) => (
                                                    <MenuItem key={server.id} value={server.id}>
                                                        {' '}
                                                        {server.serverName}{' '}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>

                                    <div>
                                        <Box sx={{ mt: 2, minWidth: 230 }}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    disabled={reservation.serverId === '' ? true : false}
                                                    label="Reservation Start Date"
                                                    name="reservationStartDate"
                                                    value={reservation.reservationStartDate}
                                                    onChange={(date) => {
                                                        setReservation({
                                                            ...reservation,
                                                            reservationStartDate: dayjs(date.toDate().getTime())
                                                        });
                                                    }}
                                                    disablePast={true}
                                                    shouldDisableDate={date => disableReservedDates(date.toDate())}
                                                />
                                            </LocalizationProvider>
                                        </Box>

                                        <Box sx={{ mt: 2, minWidth: 230 }}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    disabled={reservation.serverId === '' ? true : false}
                                                    label="Reservation End Date"
                                                    name="reservationEndDate"
                                                    value={reservation.reservationEndDate}
                                                    onChange={(date) => {
                                                        setReservation({
                                                            ...reservation,
                                                            reservationEndDate: dayjs(date.toDate().getTime())
                                                        });
                                                    }}
                                                    disablePast={true}
                                                    shouldDisableDate={date => disableReservedDates(date.toDate())}
                                                />
                                            </LocalizationProvider>
                                        </Box>
                                    </div>

                                    <div>
                                        <TextField
                                            name="description"
                                            id="outlined-basic"
                                            label="Server Description"
                                            variant="outlined"
                                            value={reservation.description}
                                            onChange={(i) => onInputChangeReservation(i)}
                                            sx={{ mt: 2, minWidth: 230 }}
                                            multiline
                                        />
                                    </div>

                                    <div>
                                        <Button
                                            variant="outlined"
                                            style={{ marginTop: 15, maxWidth: 120, minWidth: 120 }}
                                            onClick={() => handleCreateReservation()}
                                        >
                                            Create
                                        </Button>
                                    </div>

                                    <Typography variant="body2" color="text.secondary" align="left"></Typography>
                                </CardContent>
                                <CardActions disableSpacing></CardActions>
                            </Card>
                        </Box>
                    </Modal>
                </div>

                <Button
                    onClick={handleCreateOpen}
                    variant="outlined"
                    style={{ margin: 8, backgroundColor: 'white', color: 'black', borderColor: 'white', textTransform: 'none' }}
                >
                    <AddCircleOutlineIcon></AddCircleOutlineIcon>
                </Button>

                <MUIDataTable title="Servers" columns={columns} data={rows} options={options} />
            </ThemeProvider>
        );
    }
}

export default ServerSettings;
