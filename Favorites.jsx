import React, { useEffect, useState } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Get favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFavorite = (id) => {
    // Filter out the show with the specified ID
    const updatedFavorites = favorites.filter((podcast) => podcast.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Update localStorage
  };

  return (
    <div>
      <h2>My Favorite Shows</h2>
      {favorites.length > 0 ? (
        favorites.map((podcast) => (
          <div key={podcast.id} style={{ marginBottom: '20px' }}>
            <h3>{podcast.title}</h3>
            <img src={podcast.image} alt={podcast.title} style={{ width: '200px', height: 'auto' }} />
            <p><strong>Added on:</strong> {podcast.addedOn}</p> {/* Display date and time */}
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




