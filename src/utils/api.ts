import axios from 'axios';
import { WeatherData, GeocodingData, ForecastData } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

/**
 * Fetches weather data for a specific location.
 * @param lat - The latitude of the location
 * @param lon - The longitude of the location
 * @returns The weather data for the location
 */
export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
    }
    throw error;
  }
};

/**
 * Fetches forecast data for a specific location | 5 day forecast
 * @param lat - The latitude of the location
 * @param lon - The longitude of the location
 * @returns The forecast data for the location
 */
export const fetchForecastData = async (lat: number, lon: number): Promise<ForecastData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch forecast data');
    }
    throw error;
  }
};

export const searchCity = async (query: string): Promise<GeocodingData[]> => {
  try {
    const response = await axios.get(`${GEO_URL}/direct`, {
      params: {
        q: query,
        limit: 5,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to search city');
    }
    throw error;
  }
};
