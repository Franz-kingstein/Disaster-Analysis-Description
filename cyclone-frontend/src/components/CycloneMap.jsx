import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';

// Helper: Custom marker icon based on severity (death count)
const getMarkerColor = (deaths) => {
  const color = deaths > 1000 ? 'red' : deaths > 100 ? 'orange' : 'green';
  return new L.Icon({
    iconUrl: `https://chart.googleapis.com/chart?chst=d_map_pin_icon&chld=warning|${color}`,
    iconSize: [30, 50],
    iconAnchor: [15, 50],
    popupAnchor: [0, -40],
  });
};

// Helper: Convert string/number to array of coordinates
const processCoordinates = (value) => {
  if (typeof value === 'string' && (value.includes(',') || value.includes(' '))) {
    return value.split(/,|\s+/).map(x => parseFloat(x.trim())).filter(x => !isNaN(x));
  }
  const num = parseFloat(value);
  return isNaN(num) ? [] : [num];
};

// Helper Component: Fit map to all markers
const FitBounds = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, map]);
  return null;
};

const CycloneMap = ({ year }) => {
  const [cyclones, setCyclones] = useState([]);
  const [allBounds, setAllBounds] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/cyclone?year=${year}`)
      .then(res => setCyclones(res.data))
      .catch(err => console.error('Error fetching cyclone data:', err));
  }, [year]);

  const markers = [];

  cyclones.forEach((cyc, i) => {
    const latArr = processCoordinates(cyc["Latitude"]);
    const lngArr = processCoordinates(cyc["Longitude"]);

    const deaths = parseInt(cyc["Total Deaths"]) || 0;

    if (latArr.length && lngArr.length) {
      const coords = latArr.length === lngArr.length
        ? latArr.map((lat, j) => [lat, lngArr[j]])
        : [[latArr[0], lngArr[0]]];

      coords.forEach((pos, j) => {
        markers.push(
          <Marker key={`${i}-${j}`} position={pos} icon={getMarkerColor(deaths)}>
            <Popup>
              <b>{cyc["Event Name"] || "Unnamed Cyclone"}</b><br />
              📍 {cyc["Location"] || "Unknown"}<br />
              🗓 {cyc["Start Day"]}/{cyc["Start Month"]}/{cyc["Start Year"]}<br />
              💀 Deaths: {cyc["Total Deaths"] ?? 'N/A'}<br />
              👥 Affected: {cyc["Total Affected"]?.toLocaleString() || 'N/A'}
            </Popup>
          </Marker>
        );
      });
    }
  });

  // Build all marker positions for fitBounds
  useEffect(() => {
    const bounds = [];
    cyclones.forEach((cyc) => {
      const latArr = processCoordinates(cyc["Latitude"]);
      const lngArr = processCoordinates(cyc["Longitude"]);

      if (latArr.length && lngArr.length) {
        const coords = latArr.length === lngArr.length
          ? latArr.map((lat, j) => [lat, lngArr[j]])
          : [[latArr[0], lngArr[0]]];
        bounds.push(...coords);
      }
    });
    setAllBounds(bounds);
  }, [cyclones]);

  return (
    <MapContainer
      center={[22, 82]}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitBounds bounds={allBounds} />

      <MarkerClusterGroup>
        {markers}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default CycloneMap;
