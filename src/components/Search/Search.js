import React, { useState } from 'react';
import './Search.css';
import searchIcon from '../../img/search_icon.png';

const Search = () => {
    const [isMinimized, setIsMinimized] = useState(false);

    const handleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <div className={`search-container ${isMinimized ? 'minimized' : ''}`}>
            {!isMinimized && (
                <div className="search-content">
                    <div className="search-header">
                        <span>Location Search</span>
                        <i className="fa-solid fa-down-left-and-up-right-to-center minimize-icon" onClick={handleMinimize}></i>
                    </div>
                    <div className="search-input-container">
                        <input type="text" className="search-input" placeholder="Enter text" />
                        <img src={searchIcon} alt="Search" className="search-image" />
                    </div>
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

export default Search;
