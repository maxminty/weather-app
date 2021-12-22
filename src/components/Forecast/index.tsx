import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import cx from 'classnames';

import { WeatherCell } from 'types';

import { castWeatherResponseToType } from 'utils';

import { getCurrentWeatherDaysByLocationNameRequest } from 'api/weather';

import styles from './Forecast.module.scss';

type Cell = WeatherCell & { time: string };

const Forecast: React.FC<ForecastProps> = ({ location }) => {
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
        console.log(e);

        setForecast([]);
      }
    };
    getWeatherData();
  }, [location]);

  return (
    <aside className={styles.root}>
      <Typography variant="h6" className={styles.header}>
        <b>{location}</b> Forecast
      </Typography>

      <div className={styles.list}>
        {forecast.map((weather, i) => (
          <div className={styles.listItem} key={`forecast-cell-${i + 1}`}>
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
