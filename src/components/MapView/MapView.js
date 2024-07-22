import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import userlocationIcon from '../../img/user-icon.png'; // Ensure this path is correct
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, MarkerF } from '@react-google-maps/api';

// Define map container style
const mapContainerStyle = {
  height: '100vh',
  width: '100%'
};

// Center of the map
const center = {
  lat: -37.720933,
  lng: 145.050154
};

// Options for the Google Map
const options = {
  zoom: 15, // Default zoom level
  minZoom: 15,
  maxZoom: 18,
  restriction: {
    latLngBounds: {
      north: -37.7050,
      south: -37.7350,
      west: 145.0350,
      east: 145.0650
    },
    strictBounds: true
  },
  disableDefaultUI: true
};

// Static libraries array
const libraries = ['places'];

const MapView = ({ isMapFrozen, locationData }) => {
  const [userPosition, setUserPosition] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [directions, setDirections] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [routeSet, setRouteSet] = useState(false); // Track if route has been set

  useEffect(() => {
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
  }, [permissionStatus]);

  const directionsCallback = useCallback((response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirections(response);
        setRouteSet(true); // Route has been set
      } else {
        console.error('Directions request failed due to ', response.status);
      }
    }
  }, []);

  const onMapLoad = (map) => {
    setMapInstance(map);
    if (isMapFrozen) {
      map.setOptions({
        draggable: false,
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true
      });
    }
  };

  useEffect(() => {
    if (mapInstance) {
      if (isMapFrozen || routeSet) {
        mapInstance.setOptions({
          draggable: false,
          zoomControl: false,
          scrollwheel: false,
          disableDoubleClickZoom: true
        });
      } else {
        mapInstance.setOptions({
          draggable: true,
          zoomControl: true,
          scrollwheel: true,
          disableDoubleClickZoom: false
        });
      }
    }
  }, [isMapFrozen, routeSet, mapInstance]);

  useEffect(() => {
    if (locationData) {
      if (mapInstance) {
        mapInstance.setZoom(15); // Adjust zoom level if needed
        mapInstance.panTo({ lat: Number(locationData.Latitude), lng: Number(locationData.Longitude) });
      }
      // Clear old directions
      setDirections(null);
      setRouteSet(false); // Reset route set status
    }
  }, [locationData, mapInstance]);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDM5dnNZY9aHE7sMWKurNHJOzMAxqbcHLg"
      libraries={libraries}
      version="weekly"
      async
      defer
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15} // Default zoom level
        options={options}
        onLoad={onMapLoad}
      >
        {locationData && (
          <MarkerF
            position={{ lat: Number(locationData.Latitude), lng: Number(locationData.Longitude) }}
          />
        )}

        {userPosition && (
          <MarkerF
            position={userPosition}
            icon={{
              url: userlocationIcon,
              scaledSize: new window.google.maps.Size(28, 32)
            }}
          />
        )}

        {userPosition && locationData && !routeSet && (
          <DirectionsService
            options={{
              destination: { lat: Number(locationData.Latitude), lng: Number(locationData.Longitude) },
              origin: userPosition,
              travelMode: 'WALKING'
            }}
            callback={directionsCallback}
          />
        )}

        {directions && (
          <DirectionsRenderer
            options={{
              directions: directions,
              suppressMarkers: true
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

MapView.propTypes = {
  isMapFrozen: PropTypes.bool.isRequired,
  locationData: PropTypes.shape({
    Latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    Longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    ImageLink: PropTypes.string,
    name: PropTypes.string.isRequired,
    Comment: PropTypes.string
  }),
};

export default MapView;
