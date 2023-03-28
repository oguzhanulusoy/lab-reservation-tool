import {React, useState, useEffect,forwardRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { GetWithAuth } from '../../services/HttpService';

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
      minWidth: 100,
      maxWidth: 800,
      marginTop: 50,
    },
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: 2,
      flex: 1,
    },
  });

const Transition = forwardRef(function Transition(props, ref) {
return <Slide direction="up" ref={ref} {...props} />;
});

function PopUp(props) {
    const classes = useStyles();
    const {isOpen, reservationId, setIsOpen} = props;
    const [open, setOpen] = useState(isOpen); 
    const [reservation, setReservation] = useState();

    const getReservation = () => {
        GetWithAuth("/reservations/"+reservationId)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                setReservation(result);
            },
            (error) => {
                console.log(error)
            }
        )
        }

    const handleClose = () => {
      setOpen(false);
      setIsOpen(false);
    };

    useEffect(() => {
        setOpen(isOpen);
      }, [isOpen]);

    useEffect(() => {
        getReservation();
    }, [reservationId])

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Close
            </Typography>
          </Toolbar>
        </AppBar>

      </Dialog>
    )    
}

function UserActivity(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [rows, setRows] = useState([]);
    const {userId} = props;
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState();
    const [selectedReservation, setSelectedReservation] = useState();
  
    const handleNotification = (reservationId) => {
        setSelectedReservation(reservationId);
        setIsOpen(true);
    };

   const getActivity = () => {
    GetWithAuth("/users/activity/"+userId)
    .then(res => res.json())
    .then(
        (result) => {
            setIsLoaded(true);
            console.log(result);
            setRows(result)
        },
        (error) => {
            console.log(error)
            setIsLoaded(true);
            setError(error);
        }
    )
    }

    useEffect(() => {
        getActivity()
    }, [])


  return (
    <div>
    {isOpen? <PopUp isOpen={isOpen} reservationId={selectedReservation} setIsOpen={setIsOpen}/>: ""}
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                User Activity
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <Button onClick={() => handleNotification(row[1])}>
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                  <TableCell align="right">
                  {row[3] + " " + row[0] + " your reservation"}
                  </TableCell>
                </TableRow>
                </Button>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    </div>
  );
}

export default UserActivity;