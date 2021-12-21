import React, { useState } from 'react';
import {
  Button,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  selectHomeLocation,
  setHomeLocation,
} from 'store/slices/location/locationSlice';

import {
  selectThemeTemperature,
  setThemeTemperature,
} from 'store/slices/theme/themeSlice';
import styles from './SettingsDrawer.module.scss';

const SettingsDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const homeLocation = useAppSelector(selectHomeLocation);
  const switchThemeTemperature = useAppSelector(selectThemeTemperature);

  const [location, setLocation] = useState<string>(homeLocation);
  const [switchTemperature, setSwitchTemperature] = useState<string>(
    switchThemeTemperature.toString(),
  );

  const handleSaveSettings = () => {
    dispatch(setHomeLocation(location));

    dispatch(setThemeTemperature(switchTemperature));
  };

  const handleLocationChange = (locationSearch: string): void =>
    setLocation(locationSearch);

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
