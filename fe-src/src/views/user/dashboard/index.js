import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
// import EarningCard from './EarningCard';
import { gridSpacing } from 'store/constant';
// import Reservation from './Reservation';
import UserReservation from './UserReservation';

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                {/* <EarningCard isLoading={isLoading} /> */}
                {/* <Reservation isLoading={isLoading} /> */}
                <UserReservation isLoading={isLoading} />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
