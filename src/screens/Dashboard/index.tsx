import React, { useState } from 'react';

import {
  Drawer,
  Grid,
  Paper,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  TextField,
  Button,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import { isCityNameValid } from 'utils';

import { useAppSelector } from 'store/hooks';
import { selectHomeLocation } from 'store/slices/location/locationSlice';

import SettingsDrawer from 'components/SettingsDrawer';
import HomeWidget from 'components/HomeWidget';
import Onboarding from 'components/Onboarding';
import Forecast from 'components/Forecast';

import styles from './Dashboard.module.scss';

const DashboardContent: React.FC = () => {
  const location = useAppSelector(selectHomeLocation);

  const [showDrawer, setShowDrawer] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [locationProps, setLocationProps] = useState(location);

  const handleSearchChange = (value) => {
    if (isCityNameValid(value)) {
      setSearchLocation(value);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setLocationProps(searchLocation);
  };

  const isLocationKnown = location && location !== '';

  return (
    <>
      <Drawer
        anchor="right"
        open={showDrawer || (!isLocationKnown && showDrawer)}
        onClose={() => setShowDrawer(!isLocationKnown)}
      >
        <SettingsDrawer />
      </Drawer>

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <AppBar position="absolute">
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Weather App
            </Typography>

            <IconButton color="inherit" onClick={() => setShowDrawer(true)}>
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />

          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {isLocationKnown ? (
                <>
                  <Grid item xs={12} md={9} lg={9}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography variant="h4">Hi there!</Typography>

                      <Typography variant="body1" className={styles.subtitle}>
                        How it&apos;s going in <b>{location}</b>?
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={9}>
                    <Paper sx={{ p: 2, height: 240 }}>
                      <Forecast location={location} />
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={3} lg={3}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                      }}
                    >
                      <HomeWidget location={location} />
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={9}>
                    <Paper sx={{ p: 2 }}>
                      <form
                        onSubmit={handleOnSubmit}
                        className={styles.searchForm}
                      >
                        <TextField
                          label="Search for a city"
                          placeholder="City name"
                          value={searchLocation}
                          fullWidth
                          onChange={(e) => handleSearchChange(e.target.value)}
                        />

                        <Button
                          variant="contained"
                          type="submit"
                          className={styles.submit}
                          onClick={handleOnSubmit}
                        >
                          Search
                        </Button>
                      </form>
                    </Paper>
                  </Grid>

                  {locationProps.trim() !== '' && (
                    <>
                      <Grid item xs={12} md={9}>
                        <Paper sx={{ p: 2, height: 240 }}>
                          <Forecast location={locationProps} />
                        </Paper>
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <Paper
                          sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                          }}
                        >
                          <HomeWidget location={locationProps} />
                        </Paper>
                      </Grid>
                    </>
                  )}
                </>
              ) : (
                <Onboarding callback={() => setShowDrawer(true)} />
              )}
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default function Dashboard() {
  return <DashboardContent />;
}
