import React from 'react';
import logo from './music.png'; // Update path as needed
import { Link } from 'react-router-dom';

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
        <h1 style={{ margin: '0' }}>Let's talk</h1>
        <p style={{ margin: '0', fontSize: '14px' }}>Explore your favorite podcasts by genre and more!</p>
      </div>

      <Link to="/favorites">
          <button>Favorites</button>
        </Link>

        <Link to="/podcastInfo">
        <button>Main Page</button>
      </Link>

       {/* Link to Favorite Episodes page */}
       <Link to="/favorite-episodes">
        <button>Favorite Episodes</button>
      </Link>

    </header>
  );
};

export default Header;