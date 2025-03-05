import { useState, useEffect } from 'react';
import { GeocodingData } from '../../types/weather';
import { searchCity } from '../../utils/api';
import styles from './SearchBar.module.css';
import { MapPinIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  onCitySelect: (city: GeocodingData) => void;
}

export const SearchBar = ({ onCitySelect }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<GeocodingData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (locationError) {
      timeoutId = setTimeout(() => {
        setLocationError(null);
      }, 3000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [locationError]);

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (value.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const data = await searchCity(value);
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCity = (city: GeocodingData) => {
    onCitySelect(city);
    setQuery('');
    setSuggestions([]);
    setLocationError(null);
  };

  const handleCurrentLocation = () => {
    setLocationError(null);
    if (!('geolocation' in navigator)) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=${
              import.meta.env.VITE_OPENWEATHER_API_KEY
            }`
          );
          const data = await response.json();
          if (data && data.length > 0) {
            handleSelectCity(data[0]);
          } else {
            setLocationError('Could not find city for your location');
          }
        } catch (error) {
          console.error('Error fetching location name:', error);
          setLocationError('Failed to get city name for your location');
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Please allow location access to use this feature');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information is unavailable');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out');
            break;
          default:
            setLocationError('An error occurred getting your location');
        }
      },
      { timeout: 30000, enableHighAccuracy: true, maximumAge: 75000 }
    );
  };

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.inputWrapper}>
        <input type='text' value={query} onChange={(e) => handleSearch(e.target.value)} placeholder='Search for a city...' className={styles.input} />
        {isLoading && <div className={styles.loadingSpinner} />}
        {!isLoading && (
          <button className={styles.locationButton} onClick={handleCurrentLocation} title='Use current location'>
            <MapPinIcon className='w-5 h-5' />
          </button>
        )}
      </div>
      {locationError && <div className={styles.errorMessage}>{locationError}</div>}
      {suggestions.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestions.map((city) => (
            <li key={`${city.lat}-${city.lon}`}>
              <button className={styles.suggestionButton} onClick={() => handleSelectCity(city)}>
                {city.name}
                {city.state && <span className={styles.state}>{city.state}</span>}
                {city.country && <span className={styles.country}>{city.country}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
