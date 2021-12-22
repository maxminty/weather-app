import { OpenWeatherResponse, WeatherCell } from '../types';

export const castWeatherResponseToType = (
  response: OpenWeatherResponse,
): WeatherCell => {
  return {
    feels_like: Math.round(response.main.feels_like),
    humidity: Math.round(response.main.humidity),
    temp: Math.round(response.main.temp),
    temp_max: Math.round(response.main.temp_max),
    temp_min: Math.round(response.main.temp_min),
  };
};

const CITY_NAME_REGEXP =
  /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;

export const isCityNameValid = (name: string): boolean =>
  CITY_NAME_REGEXP.test(name);
