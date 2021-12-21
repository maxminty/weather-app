import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';

import Header from 'components/Header';

import styles from './Dashboard.module.scss';

const Dashboard: React.FC = () => {
  const [location, setLocation] = useState('');

  const handleLocationChange = (locationSearch) => setLocation(locationSearch);

  return (
    <div className={styles.root}>
      <Header />
      <main>
        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            <div>xs=6 md=8</div>
          </Grid>
          <Grid item xs={6} md={4}>
            <div>xs=6 md=4</div>
          </Grid>
          <Grid item xs={6} md={4}>
            <div>xs=6 md=4</div>
          </Grid>
          <Grid item xs={6} md={8}>
            <div>xs=6 md=8</div>
          </Grid>
        </Grid>
        <TextField
          value={location}
          onChange={(e) => handleLocationChange(e.target.value)}
          id="outlined-basic"
          label="Location"
          variant="outlined"
        />
      </main>
    </div>
  );
};

export default Dashboard;
