import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapView.css';

const MapView = () => {
  useEffect(() => {
    const map = L.map('map', {
      center: [-37.720933, 145.050154], // Coordinates for La Trobe University
      zoom: 15,
      minZoom: 14.5,
      maxZoom: 18,
      maxBounds: [
        [-37.7300, 145.0400], // Southwest coordinates of bounds
        [-37.7110, 145.0600]  // Northeast coordinates of bounds
      ],
      bounceAtZoomLimits: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    return () => map.remove();
  }, []);

  return <div id="map" className="map-container"></div>;
};

export default MapView;
