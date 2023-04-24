import MUIDataTable from 'mui-datatables';
import { useState, useEffect } from 'react';

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

import { Book } from "@mui/icons-material";
import UserServersConfig from 'configs/user/userServersConfig.js';
import ServiceCaller from 'services/ServiceCaller';
import ServerService from 'services/servers/ServerService';
import ReservationService from 'services/reservation/ReservationService';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { toast } from 'react-toastify';

function ServerSettings() {
    const date = new Date();
    const [rows, setRows] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [createOpen, setCreateOpen] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [reservation, setReservation] = useState({
        userId: '',
        serverId: '',
        reservationStartDate: dayjs(date.getTime()),
        reservationEndDate: dayjs(date.getTime() + 86400000),
        description: ''
    })

    const onInputChangeReservation = (e) => {
        setReservation({ ...reservation, [e.target.name]: e.target.value });
    }

    const handleCreateOpen = () => {
        setCreateOpen(true);
    }

    const handleCreateClose = () => {
        setCreateOpen(false);
        setReservation({
            userId: '',
            serverId: '',
            reservationStartDate: dayjs(date.getTime()),
            reservationEndDate: dayjs(date.getTime() + 86400000),
            description: ''
        });
    }

    const disableReservedDates = (date) => {
        const userId = parseInt(sessionStorage.getItem('userId'))
        const reservations = getSelectedServerReservationInfo(reservation.serverId, userId)
        const formattedDate = new Date(date);

        for (const res of reservations) {
            const startDate = new Date(res.reservationStartDate)
            const endDate = new Date(res.reservationEndDate)

            startDate.setHours(formattedDate.getHours());
            startDate.setMinutes(formattedDate.getMinutes());
            startDate.setSeconds(formattedDate.getSeconds());
            startDate.setMilliseconds(formattedDate.getMilliseconds());

            if (formattedDate >= startDate && formattedDate <= endDate) return true
        }

        return false
    }

    const getSelectedServerReservationInfo = (serverId, userId) => {
        const m_reservations = reservations.filter(row => row.serverId === serverId && row.userId !== userId)
        return m_reservations
    }

    const validateReservationDate = (res) => {
        const startDate = new Date(res.reservationStartDate)
        const endDate = new Date(res.reservationEndDate)

        return startDate <= endDate;
    }

    const loadSelectedServer = (id) => {
        const row = rows.filter(row => row.id === id);
        setReservation({
            ...reservation, serverId: row[0].id
        })
    }

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

    const columns = UserServersConfig.UserServerColumns;
    columns[columns.length - 1].options.customBodyRenderLite = (dataIndex) => {
        return (
            <Button
                aria-label="edit"
                onClick={() => {
                    handleCreateOpen();
                    loadSelectedServer(rows[dataIndex].id)
                }}
            >
                <Book style={{ color: '#9e9e9e' }}></Book>
            </Button>
        )
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

    const getReservationData = () => {
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
                handleCreateClose();
                getReservationData();
            })
            .catch((err) => {
                console.log(err);
                toast.error('Error while creating reservation', { autoClose: 1000 });
            });
    }

    useEffect(() => {
        getData();
        getReservationData();
    }, []);

    if (error) {
        return <div> Error !!!</div>;
    } else if (!isLoaded) {
        return <div> Loading... </div>;
    } else {
        return (
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable title="Servers" columns={columns} data={rows} options={UserServersConfig.options} />

                <div>
                    <Modal
                        open={createOpen}
                        onClose={handleCreateClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={UserServersConfig.style}>
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
            </ThemeProvider>
        );
    }
}

export default ServerSettings;
