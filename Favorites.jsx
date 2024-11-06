import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // State for sorting order

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

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const sortedFavorites = [...favorites].sort((a, b) => {
    return sortOrder === 'asc'
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  });

  return (
    <div>
      <h2>My Favorite Shows</h2>

      {/* Sort Order Dropdown */}
      <label htmlFor="sortOrder">Sort by Title: </label>
      <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
        <option value="asc">A to Z</option>
        <option value="desc">Z to A</option>
      </select>

      {sortedFavorites.length > 0 ? (
        sortedFavorites.map((podcast) => (
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






