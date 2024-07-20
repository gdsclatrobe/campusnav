import React from 'react';
import MapView from '../../components/MapView/MapView';
import Footer from '../../components/Footer/Footer';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <MapView />
      <Footer />
    </div>
  );
};

export default Home;
