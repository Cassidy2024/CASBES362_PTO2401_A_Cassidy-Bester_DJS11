import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './index.css';

const PodcastDetails = ({ showAudioPlayer }) => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPodcastDetails = async () => {
      setLoadingDetails(true);
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) throw new Error(`Failed to fetch details for podcast ID ${id}`);
        const data = await response.json();
        setPodcast(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching podcast details:", err);
        setError('Failed to fetch show details');
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchPodcastDetails();
  }, [id]);

  const handleEpisodeClick = (episode) => {
    localStorage.setItem('currentEpisode', JSON.stringify(episode));
    showAudioPlayer(episode);
  };

  // Save episode with show title and season number
  const handleSaveEpisode = (episode, seasonNumber) => {
    const favoriteEpisodes = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];

    // Check if episode is already in favorites
    const isEpisodeInFavorites = favoriteEpisodes.some(fav => fav.id === episode.id);

    if (!isEpisodeInFavorites) {
      const episodeWithDetails = {
        ...episode,
        showTitle: podcast.title,          // Add show title
        seasonNumber: seasonNumber + 1,     // Add season number (adjusted to 1-based index)
      };

      favoriteEpisodes.push(episodeWithDetails);
      localStorage.setItem('favoriteEpisodes', JSON.stringify(favoriteEpisodes));
      alert(`Episode "${episode.title}" saved to favorites!`);
    } else {
      alert(`Episode "${episode.title}" is already in favorites.`);
    }

    navigate('/favorite-episodes'); // Navigate to FavoriteEpisodes page
  };

  const handleSeasonClick = (index) => {
    setSelectedSeason(selectedSeason === index ? null : index);
  };

  return (
    <div className="podcast-details-container">
      {loadingDetails ? (
        <p>Loading show details...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        podcast && (
          <div className="podcast-content">
            <h3 className="podcast-title">{podcast.title}</h3>
            {podcast.image && (
              <div className="podcast-image-container">
                <img src={podcast.image} alt={`${podcast.title} Preview`} className="podcast-image" />
              </div>
            )}
            <p className="podcast-description">{podcast.description}</p>
            <h4 className="seasons-heading">Seasons and Episodes:</h4>
            {podcast.seasons && podcast.seasons.length > 0 ? (
              podcast.seasons.map((season, index) => (
                <div key={index} className="season-item">
                  <h5 
                    className="season-title" 
                    onClick={() => handleSeasonClick(index)}
                  >
                    Season {index + 1}
                  </h5>
                  {selectedSeason === index && (
                    <div className="season-episodes">
                      <ul>
                        {season.episodes && season.episodes.length > 0 ? (
                          season.episodes.map((episode) => (
                            <li key={episode.id}>
                              <strong>{episode.title}</strong>: {episode.description}
                              
                              {/* Play Episode button */}
                              <button 
                                className="play-episode-button" 
                                onClick={() => handleEpisodeClick(episode)}
                              >
                                Play Episode
                              </button>

                              {/* Save Episode button */}
                              <button 
                                className="save-episode-button" 
                                onClick={() => handleSaveEpisode(episode, index)}
                              >
                                Save Episode
                              </button>
                            </li>
                          ))
                        ) : (
                          <p>No episodes available for this season.</p>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No seasons available for this show.</p>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default PodcastDetails;














