import { Marker } from 'react-leaflet';
import { Icon, LatLng } from 'leaflet';

const icon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

interface LocationMarkerProps {
  position: LatLng;
}

export const LocationMarker = ({ position }: LocationMarkerProps) => {
  return <Marker position={position} icon={icon} />;
};
