import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_DATA } from '../data/apps';
import Loader from '../components/Loader';
import './TrendingApps.css';
import downloadIcon from '../assets/icon-downloads.png';
import ratingIcon from '../assets/icon-ratings.png';

const formatDownloads = (downloads) => {
  if (downloads >= 1000000) {
    return (downloads / 1000000).toFixed(1) + 'M';
  }
  if (downloads >= 1000) {
    return (downloads / 1000).toFixed(1) + 'K';
  }
  return downloads;
};

const AppCard = ({ app, navigate }) => {
  const appImage = new URL(`../assets/${app.image}`, import.meta.url).href;

  return (
    <div className="app-card" onClick={() => navigate(`/app-details/${app.id}`)}>
      <div className="app-image-placeholder">
        <img src={appImage} alt={app.title} className="app-icon" />
      </div>

      <div className="app-content">
        <div className="app-name">{app.title}</div>
        <div className="app-stats">
          <div className="mini-tag downloads">
            <img src={downloadIcon} alt="Downloads" className="downloads-icon" />
            {formatDownloads(app.downloads)}
          </div>
          <div className="mini-tag rating">
            <img src={ratingIcon} alt="Rating" className="rating-icon" />
            {app.ratingAvg.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
};

const TrendingApps = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setApps(APP_DATA.slice(0, 8)); 
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="trending-apps-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="trending-apps-container">
      <h1 className="trending-title">Trending Apps</h1>
      <p className="trending-subtitle">
        Explore All Trending Apps on the Market developed by us
      </p>
      <div className="apps-grid">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} navigate={navigate} />
        ))}
      </div>
      <button className="show-all-btn" onClick={() => navigate('/apps')}>
        Show All
      </button>
    </div>
  );
};

export default TrendingApps;
