import { CurrentWeather } from './CurrentWeather';
import { HourlyForecast } from './HourlyForecast';

export interface WeatherServerData {
  current: CurrentWeather;
  forecast: {
    forecastday: {
      hour: HourlyForecast[];
    }[];
  };
}
