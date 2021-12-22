import React, { useState } from 'react';
import {
  Button,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';

import { isCityNameValid } from 'utils';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  selectHomeLocation,
  setHomeLocation,
} from 'store/slices/location/locationSlice';
import {
  selectThemeTemperature,
  setThemeTemperature,
} from 'store/slices/theme/themeSlice';

import { useSnackbar } from 'components/Snackbar';

import styles from './SettingsDrawer.module.scss';
import { getCurrentWeatherDaysByLocationNameRequest } from '../../api/weather';

const SettingsDrawer: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();
  const homeLocation = useAppSelector(selectHomeLocation);
  const switchThemeTemperature = useAppSelector(selectThemeTemperature);

  const [location, setLocation] = useState<string>(homeLocation);
  const [switchTemperature, setSwitchTemperature] = useState<string>(
    switchThemeTemperature.toString(),
  );

  const handleSaveSettings = async () => {
    if (location.trim() === '') {
      return enqueueSnackbar(`Please, add a home location`, {
        variant: 'error',
      });
    }

    try {
      await getCurrentWeatherDaysByLocationNameRequest(location);

      dispatch(setHomeLocation(location));

      dispatch(setThemeTemperature(switchTemperature));
    } catch (e) {
      console.log(e);

      enqueueSnackbar(
        `Something went wrong while fetch weather data for ${location}`,
        {
          variant: 'error',
        },
      );
    }
    return null;
  };

  const handleLocationChange = (locationSearch: string): void => {
    if (isCityNameValid(locationSearch)) {
      setLocation(locationSearch);
    }
  };

  const handleTemperatureChange = (temperatureAmount: string): void =>
    setSwitchTemperature(temperatureAmount);

  return (
    <div className={styles.root}>
      <Typography variant="h4">Settings</Typography>

      <Typography variant="h6" className={styles.title}>
        Home location
      </Typography>

      <Typography variant="caption" display="block">
        Used for default weather forecast
      </Typography>

      <TextField
        value={location}
        onChange={(e) => handleLocationChange(e.target.value)}
        variant="outlined"
        fullWidth
        className={styles.input}
        margin="dense"
      />

      <Typography variant="h6" className={styles.title}>
        Theme switch value
      </Typography>

      <Typography variant="caption" display="block">
        If colder then value, set dark theme on
      </Typography>

      <OutlinedInput
        id="outlined-adornment-weight"
        value={switchTemperature}
        fullWidth
        className={styles.input}
        type="number"
        onChange={(e) => handleTemperatureChange(e.target.value)}
        endAdornment={<InputAdornment position="end">° Celsius</InputAdornment>}
        margin="dense"
      />

      <Button
        onClick={handleSaveSettings}
        variant="contained"
        fullWidth
        className={styles.submit}
      >
        Save settings
      </Button>
    </div>
  );
};

export default SettingsDrawer;
