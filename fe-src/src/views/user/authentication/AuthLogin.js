import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

// third party
import { toast } from 'react-toastify';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useNavigate } from 'react-router-dom';
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import AuthService from 'services/auth/AuthService';
import ServiceCaller from 'services/ServiceCaller';

const Login = ({ ...others }) => {
    let navigate = useNavigate();
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const [checked, setChecked] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    // const [store, setStore] = useState({
    //     tokenKey: '',
    //     currentUser: '',
    //     refreshToken: '',
    //     roleName: ''
    // });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseHidePassword = (event) => {
        event.preventDefault();
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleUsername = (value) => {
        setUsername(value);
    };

    const handlePassword = (value) => {
        setPassword(value);
    };

    const loginRequest = async () => {
        const serviceCaller = new ServiceCaller();
        let requestBody = {
            username: username,
            password: password
        }

        return await AuthService.UserLogin(serviceCaller, requestBody);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        loginRequest().then((result) => {
            if (result.status === 200) {
                localStorage.setItem('token', result.data.token);
                sessionStorage.setItem('userId', result.data.userId);
                sessionStorage.setItem('role', result.data.role);
                toast.success('Login Success', { autoClose: 1000 });
                const route = sessionStorage.getItem('role') === "USER" ? '/user' : '/admin';
                navigate(`${route}/reservations`, { replace: true });
            } else {
                toast.error('Login Failed', { autoClose: 1000 });
            }
        }).catch((err) => {
            toast.error('Login Failed', { autoClose: 1000 });
            console.log(err)
        });
    }

    return (
        <>
            <Formik>
                {({ errors, handleBlur, handleSubmit, isSubmitting, touched }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-username-login">Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-username-login"
                                type="text"
                                value={username}
                                name="username"
                                onBlur={handleBlur}
                                onChange={(i) => handleUsername(i.target.value)}
                                label="Username"
                                inputProps={{}}
                            />
                            {touched.username && errors.username && (
                                <FormHelperText error id="standard-weight-helper-text-username-login">
                                    {errors.username}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={(i) => handlePassword(i.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseHidePassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Typography variant="subtitle1" color="#6F6E6E" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                                Forgot Password?
                            </Typography>
                        </Stack>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    style={{ backgroundColor: '#6F6E6E' }}
                                    onClick={(e) => handleLogin(e)}
                                >
                                    Sign in
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default Login;
