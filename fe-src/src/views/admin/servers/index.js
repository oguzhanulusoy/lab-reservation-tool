import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';

import ServerSettings from './ServerSettings';

const Servers = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <ServerSettings isLoading={isLoading} />
            </Grid>
        </Grid>
    );
};

export default Servers;
