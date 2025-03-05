import { ForecastData } from '../../types/weather';
import { formatDate } from '../../utils/date';
import styles from './Forecast.module.css';

interface ForecastProps {
  forecast: ForecastData;
}

export const Forecast = ({ forecast }: ForecastProps) => {
  const dailyForecasts = forecast.list.reduce((acc, item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, typeof forecast.list>);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>5-Day Forecast</h3>
      <div className={styles.forecastList}>
        {Object.entries(dailyForecasts).map(([date, items]) => {
          const dayForecast = items[0];
          return (
            <div key={date} className={styles.forecastDay}>
              <div className={styles.dayHeader}>
                <span className={styles.date}>{formatDate(date)}</span>
                <div className={styles.tempRange}>
                  <span className={styles.tempHigh}>
                    {Math.round(Math.max(...items.map(item => item.main.temp_max)))}°
                  </span>
                  <span className={styles.tempLow}>
                    {Math.round(Math.min(...items.map(item => item.main.temp_min)))}°
                  </span>
                </div>
              </div>
              <div className={styles.dayContent}>
                <img
                  src={`https://openweathermap.org/img/wn/${dayForecast.weather[0].icon}@2x.png`}
                  alt={dayForecast.weather[0].description}
                  className={styles.weatherIcon}
                />
                <div className={styles.weatherDetails}>
                  <span className={styles.description}>
                    {dayForecast.weather[0].description}
                  </span>
                  <div className={styles.stats}>
                    <div className={styles.stat}>
                      <span className={styles.label}>Humidity</span>
                      <span className={styles.value}>{dayForecast.main.humidity}%</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.label}>Wind</span>
                      <span className={styles.value}>{Math.round(dayForecast.wind.speed)} m/s</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.label}>Rain</span>
                      <span className={styles.value}>{Math.round(dayForecast.pop * 100)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
