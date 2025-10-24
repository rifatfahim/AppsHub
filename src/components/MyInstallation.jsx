import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import iconDownloads from '../assets/icon-downloads.png';
import iconRatings from '../assets/icon-ratings.png';
import './MyInstallation.css';

function formatDownloads(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(0) + "M";
  if (num >= 1000) return (num / 1000).toFixed(0) + "K";
  return num.toString();
}

const LOCAL_STORAGE_KEY = 'installed-apps';
function getInstalledApps() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}
function setInstalledApps(apps) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(apps));
}

const getImageUrl = (name) => new URL(`../assets/${name}`, import.meta.url).href;

export default function MyInstallation() {
  const [installedApps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');
  const [sortOrder, setSortOrder] = useState('high-low');

  // Initial load
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setApps(getInstalledApps());
      setLoading(false);
    }, 400);
  }, []);

  function handleUninstall(id) {
    setLoading(true);
    setTimeout(() => {
      const filtered = installedApps.filter(app => app.id !== id);
      setApps(filtered);
      setInstalledApps(filtered);
      setToastMsg('App uninstalled successfully!');
      setLoading(false);
      // Optional: clear toast after a delay
      setTimeout(() => setToastMsg(''), 2000);
    }, 400);
  }

  function handleSort(e) {
    setSortOrder(e.target.value);
  }

  const sortedApps = [...installedApps].sort((a, b) => {
    if (sortOrder === 'high-low') return b.downloads - a.downloads;
    else return a.downloads - b.downloads;
  });

  return (
    <div className="my-installation-page">
      <div className="my-installation-content">
        <h1>Your Installed Apps</h1>
        <p className="subtitle-text">
          Explore All Trending Apps on the Market developed by us
        </p>
        <div className="install-controls">
          <div>{sortedApps.length} Apps Found</div>
          <select value={sortOrder} onChange={handleSort} aria-label="Sort by Download">
            <option value="high-low">Sort by Downloads: High-Low</option>
            <option value="low-high">Sort by Downloads: Low-High</option>
          </select>
        </div>
        {loading ? (
          <Loader />
        ) : (
          sortedApps.length === 0 ? (
            <div>No app installed yet.</div>
          ) : (
            <div className="installed-apps-list">
              {sortedApps.map(app => (
                <div key={app.id} className="installed-app-card">
                  <div className="app-card-imagebox">
                    <img src={getImageUrl(app.image)} alt={app.title} className="app-avatar" />
                  </div>
                  <div className="app-main-content">
                    <div className="app-title">{app.title}</div>
                    <div className="app-meta-row">
                      <span>
                        <img src={iconDownloads} alt="downloads" className="meta-icon" />
                        <span className="app-meta-downloads">{formatDownloads(app.downloads)}</span>
                      </span>
                      <span>
                        <img src={iconRatings} alt="star" className="meta-icon" />
                        <span>{app.ratingAvg}</span>
                      </span>
                      <span className="app-meta-size">{app.size} MB</span>
                    </div>
                  </div>
                  <button className="uninstall-btn" onClick={() => handleUninstall(app.id)}>
                    Uninstall
                  </button>
                </div>
              ))}
            </div>
          )
        )}
        {toastMsg && (
          <div className="toast">{toastMsg}</div>
        )}
      </div>
    </div>
  );
}
