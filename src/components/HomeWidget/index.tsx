import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

import { WeatherCell } from 'types';

import { castWeatherResponseToType } from 'utils';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  selectThemeTemperature,
  setShowWarmTheme,
} from 'store/slices/theme/themeSlice';

import { getCurrentWeatherByLocationNameRequest } from 'api/weather';

import { useSnackbar } from 'components/Snackbar';

import styles from './HomeWidget.module.scss';

const Widget: React.FC<WidgetProps> = ({ location }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const edgeTemperature = useAppSelector(selectThemeTemperature);

  const [weather, setWeather] = useState<WeatherCell | null>(null);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        if (location) {
          const response = await getCurrentWeatherByLocationNameRequest(
            location,
          );

          const castedWeatherData = castWeatherResponseToType(response.data);

          setWeather(castedWeatherData);

          dispatch(setShowWarmTheme(castedWeatherData.temp >= edgeTemperature));
        }
      } catch (e) {
        enqueueSnackbar(
          `Something went wrong while fetch weather data for ${location}`,
          {
            variant: 'error',
          },
        );
      }
    };
    getWeatherData();
  }, [dispatch, edgeTemperature, enqueueSnackbar, location]);

  return (
    <aside className={styles.root}>
      <Typography variant="h6">{location}</Typography>

      <div className={styles.row}>
        <Typography variant="body1">Temperature</Typography>

        <Typography variant="body1" className={styles.amount}>
          {weather ? `${weather.temp}°` : '-'}
        </Typography>
      </div>

      <div className={styles.row}>
        <Typography variant="body1">Feels like</Typography>

        <Typography variant="body1" className={styles.amount}>
          {weather ? `${weather.feels_like}°` : '-'}
        </Typography>
      </div>

      <div className={styles.row}>
        <Typography variant="body1">Day min/max</Typography>

        <Typography variant="body1" className={styles.amount}>
          {weather ? `${weather.temp_min}° / ${weather.temp_max}°` : '-'}
        </Typography>
      </div>

      <div className={styles.row}>
        <Typography variant="body1">Humidity</Typography>

        <Typography variant="body1" className={styles.amount}>
          {weather ? `${weather.humidity}%` : '-'}
        </Typography>
      </div>
    </aside>
  );
};

type WidgetProps = {
  location: string;
};

export default Widget;
