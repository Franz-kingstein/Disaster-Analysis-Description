import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // default export
import './index.css';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default icon issue in many setups
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* App contains Router */}
  </React.StrictMode>
);
