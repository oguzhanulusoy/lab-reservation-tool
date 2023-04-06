import MUIDataTable from 'mui-datatables';
import {
    createTheme,
    ThemeProvider,
    Button,
    Modal,
    Box,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';
import AdminUsersConfig from 'configs/admin/adminUsersConfig';
import ServiceCaller from 'services/ServiceCaller';
import UserService from 'services/users/UserService';
import RoleService from 'services/role/RoleService';
import { toast } from 'react-toastify';

function UserCard() {
    const [rows, setRows] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [roleList, setRoleList] = useState([])
    const [user, setUser] = useState({
        id: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        roleId: ''
    })

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

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleUpdateOpen = () => {
        setUpdateOpen(true)
    }

    const handleUpdateClose = () => {
        setUpdateOpen(false)
        setUser({id: '', firstName: '', lastName: '', username: '', email: '', roleId: ''})
    }

    const loadUser = (id) => {
        const arr = rows.filter(row => row.id === id)
        setUser({
            id: arr[0].id,
            firstName: arr[0].firstName,
            lastName: arr[0].lastName,
            username: arr[0].username,
            email: arr[0].email,
            roleId: arr[0].roleId.id
        })
    }

    const columns = AdminUsersConfig.AdminUsersColumns;
    const options = AdminUsersConfig.options;

    columns[columns.length - 1].options.customBodyRenderLite = (dataIndex) => {
        return (
            <Button aria-label="edit" onClick={() => {handleUpdateOpen(); loadUser(rows[dataIndex].id)}}>
                <EditIcon style={{ color: '#9e9e9e' }}></EditIcon>
            </Button>
        );
    }

    const getUserData = () => {
        const serviceCaller = new ServiceCaller();
        UserService.getUsers(serviceCaller, '')
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

    const getRoleData = () => {
        const serviceCaller = new ServiceCaller();
        RoleService.getRoles(serviceCaller, '').then((result) => {
            setIsLoaded(true);
            setRoleList(result.data);
        }).catch((err) => {
            console.log(err);
            setIsLoaded(true);
            setError(err);
        });
    }

    const handleUpdate = () => {
        const serviceCaller = new ServiceCaller();
        const requestBody = {firstName: user.firstName, lastName: user.lastName,
            username: user.username, email: user.email, roleId: user.roleId}

        UserService.updateUser(serviceCaller, requestBody, user.id)
            .then((result) => {
                toast.success('User updated successfully', { autoClose: 1000 })
                handleUpdateClose()
                getUserData()
            }).catch((err) => {
                console.log(err);
                toast.error('Error while updating user', { autoClose: 1000 });
            });
    }

    useEffect(() => {
        getUserData();
        getRoleData();
    }, []);

    if (error) {
        return <div> Error !!!</div>;
    } else if (!isLoaded) {
        return <div> Loading... </div>;
    } else {
        return (
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable title="Users" columns={columns} data={rows} options={options} />

                <div>
                <Modal
                    open={updateOpen}
                    onClose={handleUpdateClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={AdminUsersConfig.style}>
                    <Card sx={{ margin: 2, maxWidth: 500 }}>
                        <CardHeader align="center" title="Edit User" />
                        <CardContent align="center">
                        <div>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-helper-label">User Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                name="roleId"
                                value={user.roleId}
                                label="User Role"
                                onChange={e => onInputChange(e)}
                                style={{ width: 210 }}
                            >
                                {roleList.map(role => (
                                    <MenuItem key={role.id} value={role.id} > {role.roleName} </MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                        </div>

                        <div>
                            <Button variant="outlined" style={{ marginLeft: 0, marginTop: 10 }} onClick={() => handleUpdate()}>Save</Button>
                        </div>
                        <Typography variant="body2" color="text.secondary" align="left">
                        </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                        </CardActions>
                    </Card>
                    </Box>
                </Modal>
                </div>
            </ThemeProvider>
        );
    }
}

export default UserCard;
