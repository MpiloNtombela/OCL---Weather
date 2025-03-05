import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData, fetchForecastData, searchCity } from '../utils/api';
import { WeatherData, GeocodingData, ForecastData } from '../types/weather';

/**
 * Fetches weather data for a specific location using the OpenWeatherMap API
 * @param lat - The latitude of the location
 * @param lon - The longitude of the location
 * @returns The weather data for the location
 */
export const useWeather = (lat: number | null, lon: number | null) => {
  const weatherQuery = useQuery<WeatherData, Error>({
    queryKey: ['weather', lat, lon],
    queryFn: () => {
      if (!lat || !lon) {
        throw new Error('Latitude and longitude are required');
      }
      return fetchWeatherData(lat, lon);
    },
    enabled: !!lat && !!lon,
  });

  const forecastQuery = useQuery<ForecastData, Error>({
    queryKey: ['forecast', lat, lon],
    queryFn: () => {
      if (!lat || !lon) {
        throw new Error('Latitude and longitude are required');
      }
      return fetchForecastData(lat, lon);
    },
    enabled: !!lat && !!lon,
  });

  return {
    weather: weatherQuery.data,
    forecast: forecastQuery.data,
    isLoading: weatherQuery.isLoading || forecastQuery.isLoading,
    error: weatherQuery.error || forecastQuery.error,
  };
};

const TEN_MINUTES = 1000 * 60 * 10;

/**
 * Searches for cities based on a query string using the OpenWeatherMap API, and caches the results for 10 minutes (staleTime)
 * @param query - The query string to search for
 * @returns The geocoding data for the city
 */
export const useCitySearch = (query: string) => {
  return useQuery<GeocodingData[], Error>({
    queryKey: ['citySearch', query],
    queryFn: () => searchCity(query),
    enabled: query.length > 0,
    staleTime: TEN_MINUTES,
  });
};
