import { useState, useEffect } from 'react';
import { Map } from './components/Map/Map';
import { WeatherInfo } from './components/WeatherInfo/WeatherInfo';
import { SearchBar } from './components/SearchBar/SearchBar';
import { SearchHistory } from './components/SearchBar/SearchHistory';
import { Navbar } from './components/Navbar/Navbar';
import { useWeather } from './hooks/useWeather';
import { GeocodingData } from './types/weather';
import { LatLng } from 'leaflet';
import styles from './App.module.css';

const MAX_HISTORY = 5;

function App() {
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLng | null>(null);
  const [searchHistory, setSearchHistory] = useState<GeocodingData[]>(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const { weather, forecast, isLoading, error } = useWeather(selectedLocation?.lat ?? null, selectedLocation?.lng ?? null);

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleLocationSelect = (lat: number, lon: number) => {
    setSelectedLocation(new LatLng(lat, lon));
  };

  const handleCitySelect = (city: GeocodingData) => {
    const location = new LatLng(city.lat, city.lon);
    setSelectedLocation(location);
    setMapCenter(location);

    setSearchHistory((prev) => {
      const filtered = prev.filter((item) => !(item.lat === city.lat && item.lon === city.lon));
      return [city, ...filtered].slice(0, MAX_HISTORY);
    });
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const handleCloseWeatherInfo = () => {
    setSelectedLocation(null);
  };

  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.searchContainer}>
          <SearchBar onCitySelect={handleCitySelect} />
          <SearchHistory history={searchHistory} onSelect={handleCitySelect} onClear={handleClearHistory} />
        </div>
        <div className={styles.mainContent}>
          <div className={styles.mapContainer}>
            <Map onLocationSelect={handleLocationSelect} center={mapCenter || undefined} selectedLocation={selectedLocation || undefined} minZoom={3} />
          </div>
          {weather && (
            <div className={styles.sidebar}>
              <WeatherInfo weather={weather} forecast={forecast} isLoading={isLoading} error={error} onClose={handleCloseWeatherInfo} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
