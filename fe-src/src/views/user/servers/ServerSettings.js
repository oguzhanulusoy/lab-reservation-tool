import MUIDataTable from 'mui-datatables';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { useState, useEffect } from 'react';
import UserServersConfig from 'configs/user/userServersConfig.js';
import ServiceCaller from 'services/ServiceCaller';
import ServerService from 'services/servers/ServerService';

function ServerSettings() {
    const [rows, setRows] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        getData();
    }, []);

    if (error) {
        return <div> Error !!!</div>;
    } else if (!isLoaded) {
        return <div> Loading... </div>;
    } else {
        return (
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable title="Servers" columns={columns} data={rows} options={UserServersConfig.options} />
            </ThemeProvider>
        );
    }
}

export default ServerSettings;
