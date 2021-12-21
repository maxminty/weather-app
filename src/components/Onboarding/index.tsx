import React, { useState } from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';

import { getCurrentWeatherByLocationNameRequest } from 'api/weather';

import { useAppDispatch } from 'store/hooks';
import { setHomeLocation } from 'store/slices/location/locationSlice';

import { useSnackbar } from 'components/Snackbar';

import styles from './Onboarding.module.scss';

const Onboarding: React.FC = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [searchLocation, setSearchLocation] = useState('');

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getCurrentWeatherByLocationNameRequest(
        searchLocation,
      );
      if (response.data) {
        dispatch(setHomeLocation(searchLocation));
      }
    } catch (error) {
      console.log(error);

      enqueueSnackbar(
        <span>
          Something went wrong while fetch weather data for {searchLocation}.{' '}
          <br /> Try to search it again.
        </span>,
        {
          variant: 'error',
        },
      );
    }
  };

  return (
    <Grid item xs={12} md={8} lg={12}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 240,
        }}
      >
        <Typography variant="h4">Hi there!</Typography>

        <Typography variant="body1" className={styles.subtitle}>
          Please, setup your <b>home location</b>
        </Typography>

        <div className={styles.row}>
          <TextField
            label="Search for a city"
            placeholder="City name"
            value={searchLocation}
            className={styles.search}
            onChange={(e) => setSearchLocation(e.target.value)}
          />

          <Button
            variant="contained"
            type="submit"
            className={styles.save}
            onClick={handleOnSubmit}
          >
            Save
          </Button>
        </div>
      </Paper>
    </Grid>
  );
};

export default Onboarding;
