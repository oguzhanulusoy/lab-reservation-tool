import { useEffect, useState } from 'react';

import { Grid } from '@mui/material';

import { gridSpacing } from 'store/constant';
import ReservationSettings from './ReservationSettings';

const Reservations = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <ReservationSettings isLoading={isLoading} />
            </Grid>
        </Grid>
    );
};

export default Reservations;
