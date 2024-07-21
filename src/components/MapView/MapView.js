import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import imageIcon from '../../img/marker-icon.png';
import './MapView.css';

const MapView = ({ isMapFrozen, locationData }) => {
  useEffect(() => {
    const map = L.map('map', {
      center: [-37.720933, 145.050154], // Coordinates for La Trobe University
      zoom: 16,
      minZoom: 15,
      maxZoom: 18,
      maxBounds: [
        [-37.7350, 145.0350], // Southwest coordinates of bounds
        [-37.7050, 145.0650]  // Northeast coordinates of bounds
      ],
      bounceAtZoomLimits: false,
      zoomControl: false, // Disable default zoom controls
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const toggleMapMovement = (freeze) => {
      if (freeze) {
        map.dragging.disable();
        map.scrollWheelZoom.disable();
        map.doubleClickZoom.disable();
        map.touchZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
      } else {
        map.dragging.enable();
        map.scrollWheelZoom.enable();
        map.doubleClickZoom.enable();
        map.touchZoom.enable();
        map.boxZoom.enable();
        map.keyboard.enable();
      }
    };

    toggleMapMovement(isMapFrozen);

    // Custom icon
    const customIcon = L.icon({
      iconUrl: imageIcon,
      iconSize: [28, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    // Marker if locationData is provided
    if (locationData) {
      const { Latitude, Longitude, ImageLink, name } = locationData;

      L.marker([Latitude, Longitude], { icon: customIcon }).addTo(map)
        .bindPopup(`
          <div style="text-align: center;">
            <h3 style="margin: 5px 0;">${name}</h3>
            <img src="${ImageLink}" alt="${name}" style="width: 100px; height: 100px; border-radius: 10px; border: 2px solid white;">
          </div>
        `);

      map.setView([Latitude, Longitude], 16); // Center map on selected location
    }

    return () => map.remove();
  }, [isMapFrozen, locationData]);

  return <div id="map" className="map-container"></div>;
};

MapView.propTypes = {
  isMapFrozen: PropTypes.bool.isRequired,
  locationData: PropTypes.shape({
    Latitude: PropTypes.number.isRequired,
    Longitude: PropTypes.number.isRequired,
    ImageLink: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default MapView;
