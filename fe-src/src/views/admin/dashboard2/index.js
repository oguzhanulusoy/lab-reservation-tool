import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import Server from './Server';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard2 = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Server isLoading={isLoading} />
            </Grid>
        </Grid>
    );
};

export default Dashboard2;
