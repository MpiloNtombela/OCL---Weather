import { WeatherData, ForecastData } from '../../types/weather';
import { formatTime } from '../../utils/date';
import { Forecast } from './Forecast';
import styles from './WeatherInfo.module.css';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface WeatherInfoProps {
  weather: WeatherData;
  forecast?: ForecastData;
  isLoading: boolean;
  error: Error | null;
  onClose: () => void;
}

export const WeatherInfo = ({ weather, forecast, isLoading, error, onClose }: WeatherInfoProps) => {
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={onClose} title="Close weather info">
        <XMarkIcon className="w-5 h-5" />
      </button>
      <div className={styles.header}>
        <h2 className={styles.location}>
          {weather.name || 'Unknown Location'}
          <span className={styles.country}>{weather.sys.country}</span>
        </h2>
        <div className={styles.updateTime}>
          Updated at {formatTime(weather.dt)}
        </div>
      </div>

      <div className={styles.mainInfo}>
        <div className={styles.weatherIcon}>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt={weather.weather[0].description}
          />
        </div>
        <div className={styles.temperature}>
          {Math.round(weather.main.temp)}°C
        </div>
        <div className={styles.description}>
          {weather.weather[0].description}
        </div>
        <div className={styles.tempRange}>
          <span className={styles.tempHigh}>H: {Math.round(weather.main.temp_max)}°</span>
          <span className={styles.tempDivider}>|</span>
          <span className={styles.tempLow}>L: {Math.round(weather.main.temp_min)}°</span>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.label}>Feels like</span>
          <span className={styles.value}>{Math.round(weather.main.feels_like)}°C</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Humidity</span>
          <span className={styles.value}>{weather.main.humidity}%</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Wind speed</span>
          <span className={styles.value}>{Math.round(weather.wind.speed)} m/s</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Pressure</span>
          <span className={styles.value}>{weather.main.pressure} hPa</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Visibility</span>
          <span className={styles.value}>{(weather.visibility / 1000).toFixed(1)} km</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Cloud cover</span>
          <span className={styles.value}>{weather.clouds.all}%</span>
        </div>
      </div>

      <div className={styles.sunTimes}>
        <div className={styles.sunTime}>
          <span className={styles.sunTimeLabel}>Sunrise</span>
          <span className={styles.sunTimeValue}>{formatTime(weather.sys.sunrise)}</span>
        </div>
        <div className={styles.sunTime}>
          <span className={styles.sunTimeLabel}>Sunset</span>
          <span className={styles.sunTimeValue}>{formatTime(weather.sys.sunset)}</span>
        </div>
      </div>

      {forecast && <Forecast forecast={forecast} />}
    </div>
  );
};
