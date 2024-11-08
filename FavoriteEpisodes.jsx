import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Audio from './audio';
import './index.css';

const FavoriteEpisodes = () => {
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [sortOrder, setSortOrder] = useState('A-Z'); // Default to A-Z sort
  const [notification, setNotification] = useState(''); 

  const navigate = useNavigate();

  // Load favorite episodes from localStorage
  useEffect(() => {
    const savedEpisodes = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];
    console.log("Loaded favorite episodes:", savedEpisodes); // Debugging step: Check loaded episodes
    setFavoriteEpisodes(savedEpisodes);
  }, []);

  // Add episode to favorites
  const handleAddFavorite = (episode) => {
    // Create a unique identifier for each episode using the show title, season number, and episode id
    const uniqueEpisodeId = `${episode.showTitle}-${episode.seasonNumber}-${episode.id}`;

    // Check if the episode with this unique identifier already exists in favorites
    const episodeExists = favoriteEpisodes.some((favEpisode) => favEpisode.uniqueEpisodeId === uniqueEpisodeId);

    if (episodeExists) {
      setNotification(`The episode "${episode.title}" is already in favorites.`);
      setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
      return;
    }

    const currentDate = new Date();
    const addedOn = currentDate.toLocaleString(); // Save date and time in a readable format

    const updatedEpisode = {
      ...episode,
      uniqueEpisodeId,  
      addedOn,           
    };

    const updatedFavorites = [...favoriteEpisodes, updatedEpisode];
    localStorage.setItem('favoriteEpisodes', JSON.stringify(updatedFavorites));
    setFavoriteEpisodes(updatedFavorites);
  };

  // Remove episode from favorites
  const handleRemoveFavorite = (episodeId) => {
    console.log("Attempting to remove episode with id:", episodeId); // Debugging step: Check episode ID being passed

    // Validate if episodeId exists
    if (!episodeId) {
      console.error("No episode ID provided for removal");
      return;
    }

    // Remove the episode with the matching ID
    const updatedFavorites = favoriteEpisodes.filter(episode => episode.uniqueEpisodeId !== episodeId);

    console.log("Updated favorites after removal:", updatedFavorites); // Debugging step: Check updated favorites list

    // Update localStorage only if episode was removed
    if (updatedFavorites.length !== favoriteEpisodes.length) {
      localStorage.setItem('favoriteEpisodes', JSON.stringify(updatedFavorites));
      setFavoriteEpisodes(updatedFavorites); // Update state
    } else {
      console.error("No episode with matching ID found for removal.");
    }
  };

  // Sort episodes
  const handleSortChange = (order) => {
    setSortOrder(order);

    let sortedEpisodes;

    if (order === 'A-Z' || order === 'Z-A') {
      
      sortedEpisodes = [...favoriteEpisodes].sort((a, b) => {
        return order === 'A-Z' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      });
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

      {/* Sort filter */}
      <label htmlFor="sortOrder">Sort by:</label>
      <select
        id="sortOrder"
        value={sortOrder}
        onChange={(e) => handleSortChange(e.target.value)}
      >
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="Newest">Newest First</option>
        <option value="Oldest">Oldest First</option>
      </select>

      {/* Notification for duplicate episodes */}
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
              <button onClick={() => handleRemoveFavorite(episode.uniqueEpisodeId)}>Remove from Favorites</button>
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
















