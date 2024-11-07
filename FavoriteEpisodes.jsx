import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const FavoriteEpisodes = () => {
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);

  useEffect(() => {
    // Fetch favorite episodes from localStorage
    const savedEpisodes = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];
    setFavoriteEpisodes(savedEpisodes);
  }, []);

  const handleRemoveFavorite = (episodeId) => {
    // Remove the episode from favorites
    const updatedFavorites = favoriteEpisodes.filter(episode => episode.id !== episodeId);
    localStorage.setItem('favoriteEpisodes', JSON.stringify(updatedFavorites));
    setFavoriteEpisodes(updatedFavorites);
  };

  return (
    <div className="favorite-episodes-container">
      <h2>Favorite Episodes</h2>
      {favoriteEpisodes.length > 0 ? (
        <ul>
          {favoriteEpisodes.map((episode) => (
            <li key={episode.id}>
              <strong>{episode.title}</strong> - {episode.description}
              <button onClick={() => handleRemoveFavorite(episode.id)}>Remove from Favorites</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite episodes saved.</p>
      )}
    </div>
  );
};

export default FavoriteEpisodes;
