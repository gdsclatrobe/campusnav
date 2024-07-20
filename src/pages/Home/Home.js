import React from 'react';
import MapView from '../../components/MapView/MapView';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Search from '../../components/Search/Search';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <MapView />
      <Search />
      <Navbar />
      <Footer />
    </div>
  );
};

export default Home;
