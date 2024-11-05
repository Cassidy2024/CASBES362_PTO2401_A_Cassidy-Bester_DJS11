import React, { useEffect, useState } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Get favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div>
      <h2>My Favorite Shows</h2>
      {favorites.length > 0 ? (
        favorites.map((podcast) => (
          <div key={podcast.id}>
            <h3>{podcast.title}</h3>
            <p>{podcast.description}</p>
          </div>
        ))
      ) : (
        <p>No favorites yet. Add some!</p>
      )}
    </div>
  );
};

export default Favorites;


