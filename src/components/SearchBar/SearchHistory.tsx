import { GeocodingData } from '../../types/weather';
import styles from '../../App.module.css';
import { XMarkIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface SearchHistoryProps {
  history: GeocodingData[];
  onSelect: (city: GeocodingData) => void;
  onClear: () => void;
}

export const SearchHistory = ({ history, onSelect, onClear }: SearchHistoryProps) => {
  if (history.length === 0) return null;

  return (
    <div className={styles.searchHistory}>
      <div className={styles.historyHeader}>
        <div className={styles.historyTitle}>Recent Locations</div>
        <button className={styles.clearButton} onClick={onClear} title="Clear all locations">
          <XMarkIcon className="w-4 h-4" />
          Clear all
        </button>
      </div>
      <div className={styles.historyList}>
        {history.map((city) => (
          <button
            key={`${city.lat}-${city.lon}`}
            className={styles.historyItem}
            onClick={() => onSelect(city)}
            title={`View weather in ${city.name}, ${city.country}`}
          >
            <MapPinIcon className="w-4 h-4" />
            <span>{city.name}</span>
            {city.country && (
              <span
                style={{
                  opacity: 0.6,
                  fontSize: '0.875em',
                  fontWeight: 500,
                }}
              >
                {city.country}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
