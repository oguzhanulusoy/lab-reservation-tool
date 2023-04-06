import { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import UserCard from './UserCard';

const UsersPage = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <UserCard isLoading={isLoading} />
            </Grid>
        </Grid>
    );
};

export default UsersPage;
