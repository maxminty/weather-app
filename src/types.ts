export type WeatherCell = {
  feels_like: number;
  humidity: number;
  temp: number;
  temp_max: number;
  temp_min: number;
};

export type OpenWeatherResponse = {
  main: {
    feels_like: number;
    humidity: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
};
