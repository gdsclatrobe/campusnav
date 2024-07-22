import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ref, onValue } from 'firebase/database';
import './Search.css';
import searchIcon from '../../img/search_icon.png';
import { database } from '../../config/firebaseConfig';

const Search = ({ onToggleFreeze, onLocationSelect }) => {
    const [isMinimized, setIsMinimized] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            const locationsRef = ref(database, 'Locations');
            onValue(locationsRef, (snapshot) => {
                const data = snapshot.val();
                const filteredResults = Object.keys(data)
                    .filter((location) => {
                        const locationData = data[location];
                        return (
                            location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (locationData.Comment && locationData.Comment.toLowerCase().includes(searchTerm.toLowerCase()))
                        );
                    })
                    .slice(0, 5)  // Limit to top 5 results
                    .map((location) => ({ name: location, ...data[location] }));
                setResults(filteredResults);
            });
        } else {
            setResults([]);
        }
    }, [searchTerm]);

    const handleMinimize = () => {
        const newMinimizedState = !isMinimized;
        setIsMinimized(newMinimizedState);
        onToggleFreeze(!newMinimizedState); // Toggle freeze based on the new minimized state
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleResultClick = (locationData) => {
        setIsMinimized(true); // Minimize search container
        onToggleFreeze(false); // Ensure map is not frozen
        onLocationSelect(locationData); // Pass location data to parent
    };

    return (
        <div className={`search-container ${isMinimized ? 'minimized' : ''}`}>
            {!isMinimized && (
                <div className="search-content">
                    <div className="search-header">
                        <span>CampuNav Location Search</span>
                        <i className="fa-solid fa-down-left-and-up-right-to-center minimize-icon" onClick={handleMinimize}></i>
                    </div>
                    <div className="search-input-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                        <img src={searchIcon} alt="Search" className="search-image" />
                    </div>
                    {results.length > 0 && (
                        <div className="search-results">
                            <ul>
                                {results.map((result, index) => (
                                    <li
                                        key={index}
                                        className="search-result-item"
                                        onClick={() => handleResultClick(result)}
                                    >
                                        {result.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
            {isMinimized && (
                <div className="minimized-icon" onClick={handleMinimize}>
                    <img src={searchIcon} alt="Search" className="search-image" />
                </div>
            )}
        </div>
    );
};

Search.propTypes = {
  onToggleFreeze: PropTypes.func.isRequired,
  onLocationSelect: PropTypes.func.isRequired,
};

export default Search;
