import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { APP_DATA } from '../data/apps.js';
import Loader from '../components/Loader.jsx';
import './AppDetails.css';

// --- HELPER FUNCTIONS ---
const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toLocaleString();
};
const calculateRatingPercentage = (count, maxCount) => {
  return maxCount === 0 ? 0 : (count / maxCount) * 100;
};
const getImageUrl = (name) => {
  return new URL(`../assets/${name}`, import.meta.url).href;
};
const renderDescription = (text) => {
  if (!text) return null;
  return text.split('\n\n').map((paragraph, index) => {
    if (paragraph.trim() === '') return null;
    return <p key={index} className="description-paragraph">{paragraph}</p>;
  });
};

// --- LOCAL STORAGE HELPERS ---
const LOCAL_STORAGE_KEY = 'installed-apps';
function getInstalledApps() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}
function setInstalledApps(apps) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(apps));
}

const AppDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [app, setApp] = useState(null);
  const [installed, setInstalled] = useState(false);

  // --- Fetch and set up app with effect (simulate async load) ---
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const foundApp = APP_DATA.find(a => a.id === parseInt(id));
      setApp(foundApp);
      const existing = getInstalledApps();
      setInstalled(foundApp && existing.some(a => a.id === foundApp.id));
      setLoading(false);
    }, 500); // Simulate 500ms loading
  }, [id]);

  // --- Handler for installation ---
  function handleInstall() {
    if (!installed && app) {
      const installedApps = getInstalledApps();
      installedApps.push(app);
      setInstalledApps(installedApps);
      setInstalled(true);
      // Optionally add a toast here.
    }
  }

  // --- Loader for loading state ---
  if (loading) {
    return (
      <div className="app-details-page">
        <Loader />
      </div>
    );
  }

  // --- App not found handling ---
  if (!app) {
    return (
      <div className="app-details-page not-found">
        <div className="details-container">
          <button className="install-button" onClick={() => navigate('/')}>
            Go Back to Home
          </button>
        </div>
      </div>
    );
  }

  // --- Ratings, icons, etc. ---
  const maxRatingCount = Math.max(...app.ratings.map(r => r.count));
  const iconDownloads = getImageUrl('icon-downloads.png');
  const iconRatings = getImageUrl('icon-ratings.png');
  const iconReviews = getImageUrl('icon-review.png');
  const appIcon = getImageUrl(app.image);

  // --- STAR RENDERER ---
  const renderStars = (avgRating) => {
    const fullStars = Math.round(avgRating);
    return [...Array(5)].map((_, i) => (
      <span key={i} className="star-icon" style={{ color: i < fullStars ? 'var(--star-color-gold)' : '#e0e0e0' }}>★</span>
    ));
  };

  // --- Main render ---
  return (
    <div className="app-details-page">
      <div className="details-container">

        {/* --- 1. HEADER SECTION --- */}
        <div className="details-header-section">
          <div className="icon-wrapper">
            <img src={appIcon} alt={app.title} className="details-app-icon" />
          </div>
          <div className="title-and-info">
            <h1>{app.title}</h1>
            <p className="developer-name">Developed by <span className='developer'>{app.companyName}</span></p>
            <hr className="divider" />
            <div className="stats-row">
              <div className="stat-item">
                <img src={iconDownloads} alt="Downloads" className="stat-icon" />
                <span className="stat-label">Downloads</span>
                <span className="stat-value">{formatNumber(app.downloads)}</span>
              </div>
              <div className="stat-item">
                <img src={iconRatings} alt="Average Ratings" className="stat-icon" />
                <span className="stat-label">Average Ratings</span>
                <span className="stat-value">{app.ratingAvg.toFixed(1)}</span>
              </div>
              <div className="stat-item">
                <img src={iconReviews} alt="Total Reviews" className="stat-icon" />
                <span className="stat-label">Total Reviews</span>
                <span className="stat-value">{formatNumber(app.reviews)}</span>
              </div>
            </div>
            <button
              className="install-button"
              onClick={handleInstall}
              disabled={installed}
            >
              {installed ? 'Installed' : `Install Now (${app.size} MB)`}
            </button>
          </div>
        </div>

        <hr className="divider" />

        {/* --- 2. RATINGS SECTION --- */}
        <div className="ratings-section">
          <h2>Ratings</h2>
          <div className="ratings-barchart">
            {[...app.ratings].reverse().map((rating) => (
              <div className="rating-bar-row" key={rating.name}>
                <span className="rating-stars">{rating.name}</span>
                <div className="bar-wrapper">
                  <div
                    className="rating-bar"
                    style={{
                      width: `${calculateRatingPercentage(rating.count, maxRatingCount)}%`
                    }}
                  />
                </div>
                <span className="rating-count">{formatNumber(rating.count)}</span>
              </div>
            ))}
            <div className="ratings-axis">
              {[0, 3000, 6000, 9000, 12000].map(n => (
                <span key={n}>{n}</span>
              ))}
            </div>
          </div>
        </div>

        <hr className="divider" />

        {/* --- 3. DESCRIPTION SECTION --- */}
        <div className="description-section">
          <h2>Description</h2>
          <div className="description-content">
            {renderDescription(app.description)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDetails;
