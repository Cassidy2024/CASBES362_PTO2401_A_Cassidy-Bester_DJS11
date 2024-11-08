import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Audio from './audio';
import './index.css';

const FavoriteEpisodes = () => {
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    // Read favorite episodes from localStorage when the component mounts or reloads
    const savedEpisodes = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];
    setFavoriteEpisodes(savedEpisodes);
  }, []);

  const handleRemoveFavorite = (episodeId) => {
    const updatedFavorites = favoriteEpisodes.filter(episode => episode.id !== episodeId);
    localStorage.setItem('favoriteEpisodes', JSON.stringify(updatedFavorites)); 
    setFavoriteEpisodes(updatedFavorites); 
  };

  const handlePlayEpisode = (episode) => {
    console.log(episode);  // Log episode data to verify if audioUrl is available
    setSelectedEpisode(episode);
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
                <p><em>Added on:</em> {episode.addedOn}</p> {/* Display 'added on' date and time */}
              </div>
              <button onClick={() => handlePlayEpisode(episode)}>Play Episode</button>
              <button onClick={() => handleRemoveFavorite(episode.id)}>Remove from Favorites</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite episodes saved.</p>
      )}

      {/* Render the Audio player when an episode is selected */}
      {selectedEpisode && (
        <Audio episode={selectedEpisode} onClose={() => setSelectedEpisode(null)} />
      )}
    </div>
  );
};

export default FavoriteEpisodes;






