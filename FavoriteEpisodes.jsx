import React, { useState, useEffect } from 'react';
import './index.css';

const FavoriteEpisodes = () => {
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);

  useEffect(() => {
    const savedEpisodes = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];
    setFavoriteEpisodes(savedEpisodes);
  }, []);

  const handleRemoveFavorite = (episodeId) => {
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
            <li key={episode.id} className="favorite-episode-item">
              <strong>{episode.title}</strong> - {episode.description}
              <div>
                <p><em>Show:</em> {episode.showTitle}</p>
                <p><em>Season:</em> {episode.seasonNumber}</p>
              </div>
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

