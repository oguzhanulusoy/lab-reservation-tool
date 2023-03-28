import React from "react";
import Card from '@mui/material/Card';
import { Link } from "react-router-dom";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ReservationWithAuth } from "../../services/HttpService";

function Reservation(props) {
    const {firstName,lastName,serverName,reservationDate,userId} = props;
    let disabled = localStorage.getItem("currentUser") == null ? true:false;

    return(
        <div className="reservationContainer">
            <Card sx={{ minWidth: 275 }}>
      
      <CardContent>
        <Link className="links" to={{pathname : '/users/' + userId}}>
        <Typography sx={{ fontSize: 14 }} color="text.danger" gutterBottom>
          {firstName} {lastName}
        </Typography>
        </Link>
        <Typography variant="h5" component="div">
          {serverName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          
        </Typography>
        <Typography variant="body2">
          {reservationDate}
        </Typography>
      </CardContent>
      
      <CardActions>
      </CardActions>
    </Card>
        </div>
    )
    
}

export default Reservation;