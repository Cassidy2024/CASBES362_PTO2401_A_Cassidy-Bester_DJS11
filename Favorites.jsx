import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // State for sorting by title
  const [sortByDate, setSortByDate] = useState('none'); // State for sorting by date

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

  const handleTitleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleDateSortChange = (event) => {
    setSortByDate(event.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const sortedFavorites = [...favorites]
    .sort((a, b) => {
      if (sortByDate === 'mostRecent') {
        return new Date(b.updated) - new Date(a.updated); // Most recent first
      } else if (sortByDate === 'leastRecent') {
        return new Date(a.updated) - new Date(b.updated); // Least recent first
      } else {
        // Sorting by title if no date sorting is applied
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
    });

  return (
    <div>
      <h2>My Favorite Shows</h2>

      {/* Sort by Title Dropdown */}
      <label htmlFor="sortOrder">Sort by Title: </label>
      <select id="sortOrder" value={sortOrder} onChange={handleTitleSortChange}>
        <option value="asc">A to Z</option>
        <option value="desc">Z to A</option>
      </select>

      {/* Sort by Date Dropdown */}
      <label htmlFor="dateSortOrder">Sort by Date: </label>
      <select id="dateSortOrder" value={sortByDate} onChange={handleDateSortChange}>
        <option value="none">None</option>
        <option value="mostRecent">Most Recent</option>
        <option value="leastRecent">Least Recent</option>
      </select>

      {sortedFavorites.length > 0 ? (
        sortedFavorites.map((podcast) => (
          <div key={podcast.id} style={{ marginBottom: '20px' }}>
            <h3>
              {podcast.title}{' '}
              <span style={{ fontSize: '0.9em', color: '#777' }}>
                (Last updated: {podcast.updated ? formatDate(podcast.updated) : 'N/A'})
              </span>
            </h3>
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









