import { MapContainer, TileLayer, useMapEvents, ZoomControl } from 'react-leaflet';
import { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';
import { LocationMarker } from './LocationMarker';

interface MapProps {
  onLocationSelect: (lat: number, lon: number) => void;
  center?: LatLng;
  selectedLocation?: LatLng;
  minZoom?: number;
}

const MapEvents = ({ onLocationSelect }: { onLocationSelect: (lat: number, lon: number) => void }) => {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

export const Map = ({ onLocationSelect, center, selectedLocation, minZoom = 2 }: MapProps) => {
  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        center={center || [0, 0]}
        zoom={center ? 10 : 3}
        className={styles.mapContainer}
        scrollWheelZoom={true}
        zoomControl={false}
        minZoom={minZoom}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents onLocationSelect={onLocationSelect} />
        {selectedLocation && <LocationMarker position={selectedLocation} />}
      </MapContainer>
    </div>
  );
};
