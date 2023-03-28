import React from "react";
import Reservation from "../Reservation/Reservation";
import {useState,useEffect} from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function Home() {
    const [error,setError] = useState(null);
    const [isLoaded,setIsLoaded] = useState(false);
    const [reservationList,setReservationList] = useState([]);

    useEffect(() => {
        fetch("/reservations") 
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setReservationList(result);

            },
            (error) => {
                console.log(error);
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])

    if(error) {
        return <div> Error! </div>;
    } else if(!isLoaded) {
        return <div> Loading... </div>;
    } else {
        return(

    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh'}} >
        {reservationList.map(reservation => (
                    <Reservation firstName = {reservation.firstName} lastName = {reservation.lastName}
                    serverName = {reservation.serverName} reservationDate = {reservation.reservationDate}
                    userId = {reservation.userId}></Reservation>
                    /* {reservation.id} {reservation.server} */
                ))}
        </Box>
        
      </Container>
    </React.Fragment>
    
        );
    }
}

export default Home;