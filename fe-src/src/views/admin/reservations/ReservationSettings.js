/* eslint-disable react-hooks/exhaustive-deps */
import MUIDataTable from 'mui-datatables';
import {
    createTheme,
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

import EditIcon from '@mui/icons-material/Edit';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

import { useState, useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ServiceCaller from 'services/ServiceCaller';
import ReservationService from 'services/reservation/ReservationService';
import ServerService from 'services/servers/ServerService';
import AdminReservationsConfig from 'configs/admin/adminReservationsConfig.js';
import { toast } from 'react-toastify';

function ReservationSettings() {
    const date = new Date();
    const [rows, setRows] = useState([]);
    const [selectedIdList, setSelectedIdList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [createOpen, setCreateOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [reservationId, setReservationId] = useState(null);
    const [servers, setServers] = useState([]);
    const [reservation, setReservation] = useState({
        userId: '',
        serverId: '',
        reservationStartDate: dayjs(date.getTime()),
        reservationEndDate: dayjs(date.getTime() + 86400000),
        description: ''
    });

    const onInputChange = (e) => {
        setReservation({ ...reservation, [e.target.name]: e.target.value });
    };

    const handleCreateOpen = () => {
        setCreateOpen(true);
    };

    const handleClearReservation = () => {
        setReservation({
            userId: '',
            serverId: '',
            reservationStartDate: dayjs(date.getTime()),
            reservationEndDate: dayjs(date.getTime() + 86400000),
            description: ''
        });
    }

    const handleCreateClose = () => {
        setCreateOpen(false);
        handleClearReservation();
    };

    const handleUpdateOpen = () => {
        setUpdateOpen(true);
    }

    const handleUpdateClose = () => {
        setUpdateOpen(false);
        handleClearReservation();
    }

    const loadReservation = (id) => {
        const row = rows.filter(row => row.id === id)
        const startDate = new Date(row[0].reservationStartDate)
        const endDate = new Date(row[0].reservationEndDate)
        setReservation({
            userId: row[0].userId,
            serverId: row[0].serverId,
            reservationStartDate: dayjs(startDate.getTime()),
            reservationEndDate: dayjs(endDate.getTime()),
            description: row[0].description
        })
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

    const getSelectedServerReservationInfo = (serverId, userId) => {
        const reservations = rows.filter(row => row.serverId === serverId && row.userId !== userId)
        return reservations
    }

    const handleReservationStatus = (res) => {
        const currentDate = new Date();
        const startDate = new Date(res.reservationStartDate)
        const endDate = new Date(res.reservationEndDate)

        if (currentDate < startDate) return "Pending"
        else if (currentDate <= endDate && currentDate >= startDate) return "Active"
        else return "Close"
    }

    const validateReservationDate = (res) => {
        const startDate = new Date(res.reservationStartDate)
        const endDate = new Date(res.reservationEndDate)

        return startDate <= endDate;
    }

    const getMuiTheme = () =>
        createTheme({
            overrides: {
                MuiChip: {
                    root: {
                        backgroundColor: 'grey'
                    }
                }
            }
        });

    const columns = AdminReservationsConfig.AdminReservationColumns;
    columns[columns.length - 1].options.customBodyRenderLite = (dataIndex) => {
        return (
            <Button aria-label="edit" onClick={() => { handleUpdateOpen(); loadReservation(rows[dataIndex].id); setReservationId(rows[dataIndex].id);}}><EditIcon style={{ color: "#9e9e9e" }}></EditIcon></Button>
        );
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
        onRowsDelete: ()=>{handleDeleteReservations()},
    };

    const getReservationsData = () => {
        const serviceCaller = new ServiceCaller();
        ReservationService.getReservations(serviceCaller, '')
            .then((res) => {
                setIsLoaded(true);
                setRows(res.data.map(row => row = {...row, status: handleReservationStatus(row)}));
            })
            .catch((error) => {
                console.log(error);
                setIsLoaded(true);
                setError(error);
            });
    };

    const getServersData = () => {
        const serviceCaller = new ServiceCaller();
        ServerService.getServers(serviceCaller, '')
            .then((result) => {
                setIsLoaded(true);
                setServers(result.data);
            })
            .catch((err) => {
                console.log(err);
                setIsLoaded(true);
                setError(err);
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
        };

        ReservationService.addReservation(serviceCaller, requestBody)
            .then((result) => {
                toast.success('Reservation Successfully Created', { autoClose: 1000 });
                handleCreateClose();
                getReservationsData();
            })
            .catch((err) => {
                console.log(err);
                toast.error('Error while creating reservation', { autoClose: 1000 });
            });
    };

    const handleUpdateReservation = () => {
        if (!validateReservationDate(reservation)) {
            toast.error('Reservation start date cannot be greater than end date.', { autoClose: 1000 });
            return;
        }

        const serviceCaller = new ServiceCaller();
        const requestBody = {...reservation}

        ReservationService.updateReservation(serviceCaller, requestBody, reservationId).then((result) => {
            toast.success('Reservation Successfully Updated', { autoClose: 1000 });
            handleUpdateClose();
            getReservationsData();
        }).catch((err) => {
            console.log(err);
            toast.error('Error while updating user', { autoClose: 1000 });
        });
    }

    const handleDeleteReservations = () => {
        const serviceCaller = new ServiceCaller();
        const requestBody = {ids: selectedIdList}

        ReservationService.deleteReservations(serviceCaller, requestBody).then((result) => {
            if (result.data.status === "SUCCESS") toast.success(result.data.message, { autoClose: 1000 });
            else if (result.data.status === "FAIL") toast.error(result.data.message, { autoClose: 1000 });
            else toast.error("Something went wrong!", { autoClose: 1000 });
            getReservationsData();
        }).catch((err) => {
            console.log(err);
            toast.error('Error while updating user', { autoClose: 1000 });
        });
    }

    useEffect(() => {
        getReservationsData();
        getServersData();
    }, []);
    
    if (error) {
        return <div> Error !!!</div>;
    } else if (!isLoaded) {
        return <div> Loading... </div>;
    } else {
        return (
            <ThemeProvider theme={getMuiTheme()}>
                <Button
                    onClick={handleCreateOpen}
                    variant="outlined"
                    style={{ margin: 8, backgroundColor: 'white', color: 'black', borderColor: 'white', textTransform: 'none' }}
                >
                    <AddCircleOutlineIcon></AddCircleOutlineIcon>
                </Button>
                <MUIDataTable title="Reservations" columns={columns} data={rows} options={options} />

                <div>
                    <Modal
                        open={createOpen}
                        onClose={handleCreateClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={AdminReservationsConfig.style}>
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
                                                onChange={(e) => onInputChange(e)}
                                            >
                                                {servers.map((server) => (
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
                                            onChange={(i) => onInputChange(i)}
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

                <div>
                    <Modal
                        open={updateOpen}
                        onClose={handleUpdateClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={AdminReservationsConfig.style}>
                            <Card sx={{ margin: 2, maxWidth: 500 }}>
                                <CardHeader align="center" title="Update Reservation" />
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
                                                onChange={(e) => onInputChange(e)}
                                            >
                                                {servers.map((server) => (
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
                                            onChange={(i) => onInputChange(i)}
                                            sx={{ mt: 2, minWidth: 230 }}
                                            multiline
                                        />
                                    </div>

                                    <div>
                                        <Button
                                            variant="outlined"
                                            style={{ marginTop: 15, maxWidth: 120, minWidth: 120 }}
                                            onClick={() => handleUpdateReservation()}
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
            </ThemeProvider>
        );
    }
}

export default ReservationSettings;
