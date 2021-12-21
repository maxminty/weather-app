import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setHomeLocation } from 'store/slices/location/locationSlice';
import {
  selectShowWarmTheme,
  setThemeTemperature,
} from 'store/slices/theme/themeSlice';

import DashboardScreen from 'screens/Dashboard';

import { deepOrange } from '@mui/material/colors';
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from '@mui/material/styles';

const warmTheme = createTheme({
  palette: {
    primary: {
      main: deepOrange[500],
    },
  },
});

const coldTheme = createTheme({});

const AppRoutes: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const homeLocation = localStorage.getItem('weather-home');

    const switchTemperature = localStorage.getItem('weather-switch-theme');
    console.log(homeLocation);
    dispatch(setHomeLocation(homeLocation || ''));

    dispatch(setThemeTemperature(switchTemperature || '0'));
  }, [dispatch]);

  const showWarmTheme = useAppSelector(selectShowWarmTheme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={showWarmTheme ? warmTheme : coldTheme}>
        <Routes>
          <Route path="/" element={<DashboardScreen />} />
        </Routes>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default AppRoutes;
