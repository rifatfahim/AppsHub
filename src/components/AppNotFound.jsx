import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AppNotFound.css';
import NOT_FOUND_CAT_IMG from '../assets/App-Error.png';


function AppNotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-bg">
      <div className="notfound-content">
        <img className="notfound-cat-img" src={NOT_FOUND_CAT_IMG} alt="Cat Not Found" />
        <h1 className="notfound-title">OPPS!! APP NOT FOUND</h1>
        <p className="notfound-desc">
          The App you are requesting is not found on our system. please try another apps
        </p>
        <button className="notfound-back-btn" onClick={() => navigate(-1)}>
          Go Back!
        </button>
      </div>
    </div>
  );
}
export default AppNotFound;
