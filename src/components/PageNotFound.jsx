import React from 'react';
import './PageNotFound.css';
import error404Img from '../assets/error-404.png';

const PageNotFound = () => (
  <div className="not-found-page">
    <img src={error404Img} alt="404" className="not-found-img"/>
    <h2 className="not-found-title">Oops, page not found!</h2>
    <p className="not-found-desc">The page you are looking for is not available.</p>
    <button className="not-found-btn" onClick={() => window.location.href = '/'}>
      Go Back!
    </button>
  </div>
);

export default PageNotFound;
