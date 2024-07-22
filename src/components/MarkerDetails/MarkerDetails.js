import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './MarkerDetails.css';

const MarkerDetails = ({ locationData }) => {
  const [showCircle, setShowCircle] = useState(true);
  const [showRectangle, setShowRectangle] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (locationData) {
      setSelectedName(locationData.name || 'Location Details');
      setImageUrl(locationData.ImageLink || '');
      setShowCircle(true);
      setShowRectangle(false);
    } else {
      setShowCircle(false);
      setShowRectangle(false);
    }
  }, [locationData]);

  const handleCircleClick = () => {
    setShowCircle(false);
    setShowRectangle(true);
  };

  const handleRectangleClose = () => {
    setShowCircle(true);
    setShowRectangle(false);
  };

  return (
    <>
      {showCircle && (
        <div className="glowing-circle" onClick={handleCircleClick}>
          <i className="arrow-icon fas fa-info-circle"></i>
        </div>
      )}
      <div className={`curved-rectangle ${showRectangle ? 'show' : ''}`}>
        <div className="rectangle-header">
          <i className="header-icon fas fa-info-circle"></i>
          <span className="header-text">{selectedName}</span>
        </div>
        <i className="close-icon fas fa-times" onClick={handleRectangleClose}></i>
        {imageUrl && (
          <img src={imageUrl} alt={selectedName} className="location-image" />
        )}
      </div>
    </>
  );
};

MarkerDetails.propTypes = {
  locationData: PropTypes.shape({
    name: PropTypes.string,
    Latitude: PropTypes.string.isRequired,
    Longitude: PropTypes.string.isRequired,
    ImageLink: PropTypes.string,
  }),
};

export default MarkerDetails;
