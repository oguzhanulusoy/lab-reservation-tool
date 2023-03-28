import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
// import EarningCard from './EarningCard';
import { gridSpacing } from 'store/constant';
import NewReservation from './NewReservation';

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <NewReservation isLoading={isLoading} />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
