import React from 'react';
import './HeroSection.css';
import iconGoogle from '../assets/google-play.png';
import iconApple from '../assets/App_Store.png';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-top-content">
        <h1>We Build <span className="gradient-text">Productive</span> Apps </h1>
        <p className="hero-subtitle">
          At HERO.IO, we craft innovative apps designed to make everyday life simpler, smarter, and more exciting. <br />
          Our goal is to turn your ideas into digital experiences that truly make an impact.
        </p>
        <div className="app-badges">
  <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="app-badge">
    <span><img src={iconGoogle} alt="google" className="badge-icon" /></span>
    Google Play
  </a>
  <a href="https://www.apple.com" target="_blank" rel="noopener noreferrer" className="app-badge">
    <span><img src={iconApple} alt="apple" className="badge-icon" /></span>
    App Store
  </a>
</div>

      </div>

      <div className="hero-graphic-placeholder">
      </div>

      <div className="hero-stats-bar">
        <h2 className="stats-bar-title">Trusted By Millions, Built For You</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Total Downloads</span>
            <span className="stat-number">29.6M</span>
            <span className="stat-change">21% More Than Last Month</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Reviews</span>
            <span className="stat-number">906K</span>
            <span className="stat-change">46% More Than Last Month</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Active Apps</span>
            <span className="stat-number">132+</span>
            <span className="stat-change">31 More Will Launch</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;