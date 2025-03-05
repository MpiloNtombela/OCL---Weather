// These types represent the OpenWeatherMap API response structure for the current weather data being used in the app.

/**
 * Common weather data structures shared between current and forecast data
 */
export interface MainWeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  temp_min: number;
  temp_max: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WindData {
  speed: number;
  deg: number;
  gust?: number;
}

export interface CloudsData {
  all: number;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

/**
 * Common structure for weather readings
 */
export interface WeatherReading {
  main: MainWeatherData;
  weather: WeatherCondition[];
  wind: WindData;
  clouds: CloudsData;
  visibility: number;
}

/**
 * Current weather data from OpenWeatherMap API
 */
export interface WeatherData extends WeatherReading {
  name: string;
  coord: Coordinates;
  sys: {
    sunrise: number;
    sunset: number;
    country: string;
  };
  dt: number;
}

/**
 * Forecast data from OpenWeatherMap API
 */
export interface ForecastData {
  list: Array<
    WeatherReading & {
      dt: number;
      pop: number;
      dt_txt: string;
    }
  >;
  city: {
    name: string;
    coord: Coordinates;
    country: string;
    sunrise: number;
    sunset: number;
  };
}

export interface Location {
  lat: number;
  lng: number;
}

export interface GeocodingData {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface WeatherError {
  message: string;
  cod: string;
}
