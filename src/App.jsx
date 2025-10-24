// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import Footer from './components/Footer';

import HeroSection from './components/HeroSection'; 

import TrendingApps from './components/TrendingApps'; 

import AllApps from './components/AllApps'; 

import AppDetails from './components/AppDetails'; 

import AppNotFound from './components/AppNotFound'; 

import MyInstallation from './components/MyInstallation';

import PageNotFound from './components/PageNotFound';

import './App.css'; 

const Home = () => (
    <>
        <HeroSection /> 
        <TrendingApps />
    </>
);

const Installation = () => (
    <div className="page-content">
        <h1>Installation Guide</h1>
        <p>Steps to install the platform.</p>
    </div>
);


function App() {
    return (
        <Router>
            <Header /> 
            
            <main> 
                <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/apps" element={<AllApps />} /> 
  <Route path="/app-details/:id" element={<AppDetails />} />
  <Route path="/installation" element={<Installation />} />
  <Route path="/not-found" element={<AppNotFound />} />
  <Route path="/my-installation" element={<MyInstallation />} />
  <Route path="*" element={<PageNotFound />} />
</Routes>

            </main>
            
            <Footer /> 
        </Router>
    );
}

export default App;
