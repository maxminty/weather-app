import api from './index';

export const getCurrentWeatherByLocationNameRequest = (name: string) =>
  api.get(
    `weather?q=${name}&units=metric&appid=${process.env.REACT_APP_API_KEY}`,
  );

export const getCurrentWeatherDaysByLocationNameRequest = (name: string) =>
  api.get(
    `forecast?q=${name}&mode=json&units=metric&appid=${process.env.REACT_APP_API_KEY}`,
  );
