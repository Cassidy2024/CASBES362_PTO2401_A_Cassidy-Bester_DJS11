import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css'; 

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [sortByDate, setSortByDate] = useState('none');

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter((podcast) => podcast.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
  };

  const sortedFavorites = [...favorites].sort((a, b) => {
    if (sortByDate === 'mostRecent') return new Date(b.updated) - new Date(a.updated);
    if (sortByDate === 'leastRecent') return new Date(a.updated) - new Date(b.updated);
    return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
  });

  return (
    <div className="favorites-container">
      <h2>My Favorite Shows</h2>

      <label htmlFor="sortOrder">Sort by Title: </label>
      <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">A to Z</option>
        <option value="desc">Z to A</option>
      </select>

      <label htmlFor="dateSortOrder">Sort by Date: </label>
      <select id="dateSortOrder" value={sortByDate} onChange={(e) => setSortByDate(e.target.value)}>
        <option value="none">None</option>
        <option value="mostRecent">Most Recent</option>
        <option value="leastRecent">Least Recent</option>
      </select>

      <div className="favorites-list">
        {sortedFavorites.length > 0 ? (
          sortedFavorites.map((podcast) => (
            <div key={podcast.id} className="favorite-item">
              <h3>
                {podcast.title}{' '}
                <span className="updated-date">
                  (Last updated: {podcast.updated ? formatDate(podcast.updated) : 'N/A'})
                </span>
              </h3>

              <Link to={`/podcast/${podcast.id}`}>
                <img src={podcast.image} alt={podcast.title} className="podcast-image" />
              </Link>

              <p className="added-on">
                <strong>Added on:</strong> {podcast.addedOn ? formatDate(podcast.addedOn) : 'N/A'}
              </p>

              <button onClick={() => handleRemoveFavorite(podcast.id)} className="remove-btn">
                Remove from Favorites
              </button>
            </div>
          ))
        ) : (
          <p>No favorites yet. Add some!</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
















