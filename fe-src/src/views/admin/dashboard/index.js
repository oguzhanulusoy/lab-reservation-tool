import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
// import EarningCard from './EarningCard';
import { gridSpacing } from 'store/constant';
// import EarningCard3 from './Reservation';
import Reservation from './Reservation';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                {/* <EarningCard isLoading={isLoading} /> */}
                <Reservation isLoading={isLoading} />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
