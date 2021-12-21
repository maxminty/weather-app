import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import cx from 'classnames';

import { WeatherCell } from 'types';

import { castWeatherResponseToType } from 'utils';

import { getCurrentWeatherDaysByLocationNameRequest } from 'api/weather';

import { useSnackbar } from 'components/Snackbar';

import styles from './Forecast.module.scss';

// const titles = ['1h', '3h', '1d', '2d', '3d', '4d', '5d'];

type Cell = WeatherCell & { time: string };

const Forecast: React.FC<ForecastProps> = ({ location }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [forecast, setForecast] = useState<Cell[]>([]);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        if (location) {
          const response = await getCurrentWeatherDaysByLocationNameRequest(
            location,
          );

          setForecast(
            response.data.list.map((item) => ({
              ...castWeatherResponseToType(item),
              time: item.dt_txt,
            })),
          );
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
  }, [enqueueSnackbar, location]);

  return (
    <aside className={styles.root}>
      <Typography variant="h6" className={styles.header}>
        <b>{location}</b> Forecast
      </Typography>

      <div className={styles.list}>
        {forecast.map((weather) => (
          <div className={styles.listItem}>
            <div className={styles.row}>
              <Typography
                variant="body1"
                className={cx(styles.temperature, styles.amount)}
              >
                {weather ? dayjs(weather.time).format('HH:MM DD/MM') : '-'}
              </Typography>
            </div>

            <Typography variant="h4" className={styles.temperature}>
              {weather ? `${weather.temp}°` : '-'}
            </Typography>

            <div className={styles.row}>
              <Typography variant="caption">Feels like</Typography>

              <Typography variant="caption" className={styles.amount}>
                {weather ? `${weather.feels_like}°` : '-'}
              </Typography>
            </div>

            <div className={styles.row}>
              <Typography variant="body2">Humidity</Typography>

              <Typography variant="body2" className={styles.amount}>
                {weather ? `${weather.humidity}%` : '-'}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

type ForecastProps = {
  location: string;
};

export default Forecast;
