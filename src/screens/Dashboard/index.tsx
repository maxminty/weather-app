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

import { useAppSelector } from 'store/hooks';
import { selectHomeLocation } from 'store/slices/location/locationSlice';

import SettingsDrawer from 'components/SettingsDrawer';
import HomeWidget from 'components/HomeWidget';
import Forecast from 'components/Forecast';

import styles from './Dashboard.module.scss';

const DashboardContent: React.FC = () => {
  const location = useAppSelector(selectHomeLocation);

  const [showDrawer, setShowDrawer] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [locationProps, setLocationProps] = useState(location);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setLocationProps(searchLocation);
  };

  const isLocationKnown = location.trim() !== '';

  return (
    <>
      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
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

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
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
                    {!isLocationKnown ? (
                      <>
                        Please, setup your <b>home location</b>
                      </>
                    ) : (
                      <>
                        How it&apos;s going in <b>{location}</b>?
                      </>
                    )}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4} lg={3}>
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

              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <form onSubmit={handleOnSubmit} className={styles.searchForm}>
                    <TextField
                      label="Search for a city"
                      placeholder="City name"
                      value={searchLocation}
                      fullWidth
                      onChange={(e) => setSearchLocation(e.target.value)}
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
                  <Grid item xs={9}>
                    <Paper sx={{ p: 2, height: 240 }}>
                      <Forecast location={locationProps} />
                    </Paper>
                  </Grid>

                  <Grid item xs={3}>
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
