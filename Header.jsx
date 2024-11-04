import React from 'react';
import logo from './podcast-logo.webp'; // Update path as needed

const Header = () => {
  return (
    <header style={{
      display: 'flex', 
      alignItems: 'center', 
      padding: '20px', 
      backgroundColor: '#f5f5f5'
    }}>
      {/* Logo Image */}
      <img 
        src={logo} 
        alt="Podcast App Logo" 
        style={{ width: '50px', height: '50px', marginRight: '20px' }} 
      />
      
      {/* Title and Description */}
      <div>
        <h1 style={{ margin: '0' }}>Podcast App</h1>
        <p style={{ margin: '0', fontSize: '14px' }}>Explore your favorite podcasts by genre and more!</p>
      </div>
    </header>
  );
};

export default Header;