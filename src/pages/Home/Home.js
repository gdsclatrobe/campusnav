import React from 'react';
import MapView from '../../components/MapView/MapView';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <MapView />
      <Navbar />
      <Footer />
    </div>
  );
};

export default Home;
