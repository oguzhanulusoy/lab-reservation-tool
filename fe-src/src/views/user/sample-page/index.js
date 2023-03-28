// material-ui
import { useEffect, useState } from 'react';
// material-ui
import { Grid, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';

import SampleService from 'services/sample/SampleService';
import ServiceCaller from 'services/ServiceCaller';
import Reservation from 'components/Reservation/Reservation';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ReservationService from 'services/reservation/ReservationService';




// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [isSuccess, setSuccess] = useState(false);
    const getData = () => {
        let serviceCaller = new ServiceCaller();
        ReservationService.getReservations(serviceCaller, '', (res) => {
            setSuccess(true);
            console.log(res);
            setIsLoaded(true);
            setData(res);
        },(err) => {
            setSuccess(false);
            console.log(err);
        });
    }

    useEffect(() => {
        getData()
    }, []);

    if (error) {
        return <div> Error! </div>;
    } else if (!isLoaded) {
        return <div> Loading... </div>;
    } else {

        return (
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    {data?.map((reservation) => (
                        <Typography variant="body2">
                            {/* {product.title} */}
                            <React.Fragment>
                                <CssBaseline />
                                <Container fixed>
                                    <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} >
                                        
                                            <Reservation firstName={reservation.firstName} lastName={reservation.lastName}
                                                serverName={reservation.serverName} reservationDate={reservation.reservationDate}
                                                userId={reservation.userId}></Reservation>
                                    </Box>

                                </Container>
                            </React.Fragment>
                        </Typography>
                    )
                    )}:(
                    <Typography variant="body2">
                        No Product Data
                    </Typography>
                    )


                </Grid>
            </Grid>
        )
    };
}
    export default SamplePage;

