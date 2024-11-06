import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Get favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter((podcast) => podcast.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h2>My Favorite Shows</h2>
      {favorites.length > 0 ? (
        favorites.map((podcast) => (
          <div key={podcast.id} style={{ marginBottom: '20px' }}>
            <h3>{podcast.title}</h3>
            <Link to={`/podcast/${podcast.id}`}>
              <img src={podcast.image} alt={podcast.title} style={{ cursor: 'pointer', width: '200px', height: 'auto' }} />
            </Link>
            <p><strong>Added on:</strong> {podcast.dateAdded}</p>
            <button onClick={() => handleRemoveFavorite(podcast.id)}>Remove from Favorites</button>
          </div>
        ))
      ) : (
        <p>No favorites yet. Add some!</p>
      )}
    </div>
  );
};

export default Favorites;





