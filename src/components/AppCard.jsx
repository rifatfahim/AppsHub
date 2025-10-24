import React from 'react';

import downloadIcon from '../assets/icon-downloads.png';
import ratingIcon from '../assets/icon-ratings.png';

const AppCard = ({ app, navigate, formatDownloads }) => {
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

export default AppCard;