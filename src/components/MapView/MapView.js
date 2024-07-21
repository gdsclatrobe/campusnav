import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import imageIcon from '../../img/marker-icon.png';
import userlocationIcon from '../../img/user-icon.png';
import './MapView.css';

const MapView = ({ isMapFrozen, locationData }) => {
  const [userPosition, setUserPosition] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);

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

    // Custom icons
    const customIcon = L.icon({
      iconUrl: imageIcon,
      iconSize: [28, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    const userIcon = L.icon({
      iconUrl: userlocationIcon,
      iconSize: [28, 36],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    // Marker for selected location
    if (locationData) {
      const { Latitude, Longitude, ImageLink, name } = locationData;

      const marker = L.marker([Latitude, Longitude], { icon: customIcon }).addTo(map)
        .bindPopup(`
          <div style="text-align: center;">
            <h3 style="margin: 5px 0;">${name}</h3>
            <img src="${ImageLink}" alt="${name}" style="width: 100px; height: 100px; border-radius: 10px; border: 2px solid white;">
          </div>
        `);
      
      marker.openPopup(); // Open the popup by default
      map.setView([Latitude, Longitude], 16); // Center map on selected location

      // Show route from user position to selected location
      if (userPosition) {
        L.Routing.control({
          waypoints: [
            L.latLng(userPosition.lat, userPosition.lng),
            L.latLng(Latitude, Longitude)
          ],
          createMarker: () => null, // Disable markers on route
        }).addTo(map);
      }
    }

    // Check for location permission and get user's location
    const handleLocationSuccess = (position) => {
      setUserPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      setPermissionStatus('granted');
    };

    const handleLocationError = (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        setPermissionStatus('denied');
      } else {
        setPermissionStatus('default');
      }
    };

    const requestLocationPermission = () => {
      navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError);
    };

    if (permissionStatus === null) {
      requestLocationPermission();
    }

    if (permissionStatus === 'granted' && userPosition) {
      const userMarker = L.marker([userPosition.lat, userPosition.lng], { icon: userIcon }).addTo(map)
        .bindPopup('You are here');
    
    } else if (permissionStatus === 'denied') {
      alert('Unable to access live location, running in restricted mode');
    }

    return () => map.remove();
  }, [isMapFrozen, locationData, userPosition, permissionStatus]);

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
