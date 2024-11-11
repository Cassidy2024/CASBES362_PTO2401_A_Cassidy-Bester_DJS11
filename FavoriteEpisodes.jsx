import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Audio from './audio';
import './index.css';

const FavoriteEpisodes = () => {
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load favorite episodes from localStorage
    const savedEpisodes = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];
    setFavoriteEpisodes(savedEpisodes);
  }, []);

  const handleRemoveFavorite = (uniqueEpisodeId) => {
    const updatedFavorites = favoriteEpisodes.filter(
      (episode) => episode.uniqueEpisodeId !== uniqueEpisodeId
    );

    // Check if the episode was actually removed
    if (updatedFavorites.length !== favoriteEpisodes.length) {
      localStorage.setItem('favoriteEpisodes', JSON.stringify(updatedFavorites));
      setFavoriteEpisodes(updatedFavorites);
      setNotification('Episode removed from favorites.');
    } else {
      console.error("Episode with matching ID not found for removal.");
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    let sortedEpisodes;

    if (order === 'A-Z' || order === 'Z-A') {
      sortedEpisodes = [...favoriteEpisodes].sort((a, b) =>
        order === 'A-Z' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      );
    } else if (order === 'Newest') {
      sortedEpisodes = [...favoriteEpisodes].sort((a, b) => new Date(b.addedOn) - new Date(a.addedOn));
    } else if (order === 'Oldest') {
      sortedEpisodes = [...favoriteEpisodes].sort((a, b) => new Date(a.addedOn) - new Date(b.addedOn));
    }

    setFavoriteEpisodes(sortedEpisodes);
  };

  return (
    <div className="favorite-episodes-container">
      <h2>Favorite Episodes</h2>

      <label htmlFor="sortOrder">Sort by:</label>
      <select id="sortOrder" value={sortOrder} onChange={(e) => handleSortChange(e.target.value)}>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="Newest">Newest First</option>
        <option value="Oldest">Oldest First</option>
      </select>

      {notification && <p className="notification">{notification}</p>}

      {favoriteEpisodes.length > 0 ? (
        <ul>
          {favoriteEpisodes.map((episode) => (
            <li key={episode.uniqueEpisodeId} className="favorite-episode-item">
              <strong>{episode.title}</strong> - {episode.description}
              <div>
                <p><em>Show:</em> {episode.showTitle}</p>
                <p><em>Season:</em> {episode.seasonNumber}</p>
                <p><em>Added on:</em> {episode.addedOn}</p>
              </div>
              <button onClick={() => setSelectedEpisode(episode)}>Play Episode</button>
              <button onClick={() => handleRemoveFavorite(episode.uniqueEpisodeId)}>
                Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite episodes saved.</p>
      )}

      {selectedEpisode && <Audio episode={selectedEpisode} onClose={() => setSelectedEpisode(null)} />}
    </div>
  );
};

export default FavoriteEpisodes;



















