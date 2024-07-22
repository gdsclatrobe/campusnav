import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import userlocationIcon from '../../img/user-icon.png';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, MarkerF, InfoWindowF } from '@react-google-maps/api';
import mapOptions from './mapOptions'; // Import the map options

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

// Static libraries array
const libraries = ['places'];

// Inline style for InfoWindow content
const infoWindowStyle = {
  display: 'flex',
  alignItems: 'center',
  fontSize: '14px',
  padding: '5px',
};

// Inline style for close button
const closeButtonStyle = {
  cursor: 'pointer',
  marginLeft: '10px',
  fontWeight: 'bold',
  color: '#ff0000'
};

// Add CSS to hide the default close button
const hideDefaultCloseButtonStyle = `
  .gm-ui-hover-effect {
    display: none !important;
  }
`;

const MapView = ({ isMapFrozen, locationData }) => {
  const [userPosition, setUserPosition] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [directions, setDirections] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [routeSet, setRouteSet] = useState(false); // Track if route has been set
  const [showInfoWindow, setShowInfoWindow] = useState(false); // State to control InfoWindow visibility

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
        mapInstance.setZoom(15); 
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
        zoom={15}
        options={mapOptions} // Use the imported map options
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
              scaledSize: new window.google.maps.Size(30, 38)
            }}
            onClick={() => setShowInfoWindow(!showInfoWindow)} // Toggle InfoWindow on marker click
          >
            {showInfoWindow && (
              <>
                <style>{hideDefaultCloseButtonStyle}</style>
                <InfoWindowF
                  position={userPosition} // Provide position prop
                >
                  <div style={infoWindowStyle}>
                    <span>You are here</span>
                    <span 
                      style={closeButtonStyle} 
                      onClick={() => setShowInfoWindow(false)} 
                    >
                      &times;
                    </span>
                  </div>
                </InfoWindowF>
              </>
            )}
          </MarkerF>
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
