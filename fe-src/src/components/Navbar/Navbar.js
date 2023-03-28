import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@mui/icons-material/Menu';
import "./Navbar.scss";
import { LockOpen } from "@mui/icons-material";
import Reservation from "../Reservation/Reservation";
import {useState, useEffect} from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign : "left"
  },
  link: {
      textDecoration : "none",
      boxShadow : "none",
      color : "white"
  }
}));

// const theme = {
//   root: {
//         flexGrow: 1,
//       },
//       menuButton: {
//         marginRight: theme.spacing(2),
//       },
//       title: {
//         flexGrow: 1,
//         textAlign : "left"
//       },
//       link: {
//           textDecoration : "none",
//           boxShadow : "none",
//           color : "white"
//       }
// }

// const useStyles = makeStyles({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//     textAlign : "left"
//   },
//   link: {
//       textDecoration : "none",
//       boxShadow : "none",
//       color : "white"
//   }
// });


function Navbar() {
    const [reservationList,setReservationList] = useState([]);
    const classes = useStyles();
    let navigate = useNavigate();

    const onClick = () => {
      localStorage.removeItem("tokenKey")
      localStorage.removeItem("currentUser")
      localStorage.removeItem("userName")
      navigate(0)
    }

    return(
        <div>
            <Box sx={{ flexGrow: 1,color:"black"}}>
      <AppBar position="static" sx={{color:"black"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,textAlign:"left"}}>
          <Link className="links" to="/">Home</Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{textAlign:"right"}}>
          {localStorage.getItem("currentUser") == null ? <Link className={classes.link} to="/auth">Login/Register</Link>:
            <div>
              {reservationList.map(reservation => (
                    <Reservation firstName = {reservation.firstName} lastName = {reservation.lastName}
                    serverName = {reservation.serverName} reservationDate = {reservation.reservationDate}
                    userId = {reservation.userId}></Reservation>
                    /* {reservation.id} {reservation.server} */
                ))}
            </div>}
          </Typography>
          <Typography variant="h6" component="div" sx={{flexGrow:1,textAlign:"right"}}>
            {localStorage.getItem("currentUser") == null ? <Link className={classes.link} to="/auth">Login/Register</Link>:
            <div><IconButton className={classes.link} onClick={onClick}><LockOpen></LockOpen></IconButton>
            <Link className={classes.link} to={{pathname : '/users/' + localStorage.getItem("currentUser")}}>Profile</Link>
            </div>}
          
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
    )
}

export default Navbar;