import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Snackbar,
    Stack,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Link, useNavigate } from 'react-router-dom';
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
//auth
import { ReservationWithAuth } from 'services/HttpService';
import TableDatePicker from './TableDatePicker';
import Select from '../form/Select';


// const Form = (props) => {
//     let navigate = useNavigate();
//     const theme = useTheme();
//     const scriptedRef = useScriptRef();
//     const [checked, setChecked] = useState(true);
//     const [showPassword, setShowPassword] = useState(false);

//     const {userId,serverId,refreshReservations} = props;
//     const [userName,setUserName] = useState("");
//     const [store, setStore] = useState({
//         tokenKey: "",
//         currentUser: "",
//         refreshToken: "",
//         roleName: "",
//     });
//     const handleClickShowPassword = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleMouseDownPassword = (event) => {
//         event.preventDefault();
//     };
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const handleEmail = (value) => {
//         setEmail(value)
//     }

//     const handlePassword = (value) => {
//         setPassword(value)
//     }

//     const sendRequest = (path) => {
//         ReservationWithoutAuth(("/auth/" + path), {
//             email: email,
//             password: password,
//         })
//             .then((res) => res.json())
//             .then((result) => { /* localStorage.setItem("tokenKey",result.accessToken);
//                             localStorage.setItem("refreshKey",result.refreshToken);
//                             localStorage.setItem("currentUser",result.userId);
//                             localStorage.setItem("currentUserRole",result.roleName); */
//                 setStore({ roleName: result.roleName, });
//             })
//             .catch((err) => console.log(err))
//     }
//     const handleButton = (path) => {
//         sendRequest(path);
//         setEmail("");
//         setPassword("");
//         console.log(localStorage);
//         // localStorage.getItem("currentUserRole") === "EMPLOYEE" ? navigate('/users') : navigate('/admin/servers')
//         navigate("/user/reservations");
//     };
//     return (
//         <>
//             <Formik
//                 initialValues={{
//                     email: '',
//                     password: '',
//                     submit: null
//                 }}
//                 validationSchema={Yup.object().shape({
//                     //email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
//                     //password: Yup.string().max(255).required('Password is required')
//                 })}
//                 onSubmit={async ({ setErrors, setStatus, setSubmitting }) => {
//                     try {
//                         if (scriptedRef.current) {
//                             setStatus({ success: true });
//                             setSubmitting(false);
//                         }
//                     } catch (err) {
//                         console.error(err);
//                         if (scriptedRef.current) {
//                             setStatus({ success: false });
//                             setErrors({ submit: err.message });
//                             setSubmitting(false);
//                         }
//                     }
//                 }}
//             >
//                 {({ errors, handleBlur, handleSubmit, isSubmitting, touched }) => (
//                     <form noValidate onSubmit={handleSubmit} {...others}>
//                         <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
//                             <InputLabel htmlFor="form-server">Email Address</InputLabel>
//                             <OutlinedInput
//                                 id="form-server"
//                                 type="" email
//                                 value={email}
//                                 name="email"
//                                 onBlur={handleBlur}
//                                 onChange={(i) => handleEmail(i.target.value)}
//                                 label="Email Address"
//                                 inputProps={{}}
//                             />
//                             {touched.email && errors.email && (
//                                 <FormHelperText error id="standard-weight-helper-text-email-login">
//                                     {errors.email}
//                                 </FormHelperText>
//                             )}
//                         </FormControl>

//                         <FormControl
//                             fullWidth
//                             error={Boolean(touched.password && errors.password)}
//                             sx={{ ...theme.typography.customInput }}
//                         >
//                             <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
//                             <OutlinedInput
//                                 id="outlined-adornment-password-login"
//                                 type={showPassword ? 'text' : 'password'}
//                                 value={password}
//                                 name="password"
//                                 onBlur={handleBlur}
//                                 onChange={(i) => handlePassword(i.target.value)}
//                                 endAdornment={
//                                     <InputAdornment position="end">
//                                         <IconButton
//                                             aria-label="toggle password visibility"
//                                             onClick={handleClickShowPassword}
//                                             onMouseDown={handleMouseDownPassword}
//                                             edge="end"
//                                             size="large"
//                                         >
//                                             {showPassword ? <Visibility /> : <VisibilityOff />}
//                                         </IconButton>
//                                     </InputAdornment>
//                                 }
//                                 label="Password"
//                                 inputProps={{}}
//                             />
//                             {touched.password && errors.password && (
//                                 <FormHelperText error id="standard-weight-helper-text-password-login">
//                                     {errors.password}
//                                 </FormHelperText>
//                             )}


//                         </FormControl>

//                         <FormControl fullWidth>
//                             <TableDatePicker />
//                         </FormControl>


//                         <Box sx={{ mt: 2 }}>
//                             <AnimateButton>
//                                 <Button
//                                     disableElevation
//                                     disabled={isSubmitting}
//                                     fullWidth
//                                     size="large"
//                                     type="submit"
//                                     variant="contained"
//                                     color="primary"
//                                     style={{ backgroundColor: "#6F6E6E" }}
//                                     onClick={() => handleButton('login')}
//                                 >
//                                     Get Reservation
//                                 </Button>
//                             </AnimateButton>
//                         </Box>
//                     </form>
//                 )}
//             </Formik>
//         </>
//     );
// };

function Form(props) {
    const { userName, refreshReservations } = props;
    const [userId, setUserId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [serverId, setServerId] = useState("");
    const [isSent, setIsSent] = useState(false);

    const saveReservation = () => {
        ReservationWithAuth("/reservations", {
            userId: userId,
            serverId: serverId,
            startDate: startDate,
            endDate: endDate
        })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }

    const handleSubmit = () => {
        saveReservation();
        setIsSent(true);
        setServerId("")
        setStartDate("");
        setEndDate("");
        refreshReservations();
    }

    const handleUserId = (value) => {
        setUserId(value);
        setIsSent(false);
    }
    const handleServerId = (value) => {
        setServerId(value);
        setIsSent(false);
    }

    const handleStartDate = (value) => {
        setStartDate(value);
        setIsSent(false);
    }

    const handleEndDate = (value) => {
        setEndDate(value);
        setIsSent(false);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSent(false);
    };

    return (
        <div>
            <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Your reservation is sent!
                </Alert>
            </Snackbar>
            <Card>
                <CardHeader
                    avatar={
                        <Link to={{ pathname: '/users/' + userId }}>
                        </Link>
                    }
                    title={<OutlinedInput
                        id="outlined-adornment-amount"
                        multiline
                        placeholder="User Id"
                        inputProps={{ maxLength: 25 }}
                        fullWidth
                        value={userId}
                        onChange={(i) => handleUserId(i.target.value)}
                    >
                    </OutlinedInput>}
                />

                <CardHeader
                    avatar={
                        <Link to={{ pathname: '/users/' + userId }}>
                        </Link>
                    }
                    title={<OutlinedInput
                        id="outlined-adornment-amount"
                        multiline
                        placeholder="Server Id"
                        inputProps={{ maxLength: 25 }}
                        fullWidth
                        value={serverId}
                        required
                        onChange={(i) => handleServerId(i.target.value)}
                    >
                    </OutlinedInput>}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            multiline
                            placeholder="Start Date"
                            inputProps={{ maxLength: 250 }}
                            fullWidth
                            value={startDate}
                            onChange={(i) => handleStartDate(i.target.value)}
                        >
                        </OutlinedInput>
                    </Typography>
                </CardContent>

                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            multiline
                            placeholder="End Date"
                            inputProps={{ maxLength: 250 }}
                            fullWidth
                            value={endDate}
                            onChange={(i) => handleEndDate(i.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button
                                        variant="contained"
                                        style={{
                                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                            color: 'white'
                                        }}
                                        onClick={handleSubmit}
                                    >Get Reservation</Button>

                                </InputAdornment>
                            }
                        >
                        </OutlinedInput>
                    </Typography>
                    <CardContent>
                        <Select />
                    </CardContent>
                </CardContent>
                <FormControl fullWidth>
                    <TableDatePicker />
                </FormControl>
            </Card>

        </div>

    )
}

export default Form;