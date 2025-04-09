import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MapView = () => {
  const [cyclones, setCyclones] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/cyclones`)
      .then(res => setCyclones(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <MapContainer center={[22, 82]} zoom={5} style={{ height: '90vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cyclones.map((cyc, i) => (
        cyc.Latitude && cyc.Longitude && (
          <Marker key={i} position={[cyc.Latitude, cyc.Longitude]}>
            <Popup>
              <b>{cyc["Event Name"]}</b><br />
              {cyc["Start Year"]} - {cyc["Location"]}
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
};

export default MapView;
