// src/Home.jsx
import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-background">
      <div className="overlay">
        <h1 className="home-title">Welcome to Marvel Character Manager</h1>
        <p className="home-desc">Discover, Add, Edit, and Manage your favorite Marvel characters!</p>
      </div>
    </div>
  );
}

export default Home;