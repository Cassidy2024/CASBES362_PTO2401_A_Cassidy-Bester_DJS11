import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PodcastDetails = ({ showAudioPlayer }) => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null); // State to track the selected season
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
    localStorage.setItem('currentEpisode', JSON.stringify(episode)); // Save episode data in localStorage
    showAudioPlayer(episode); // Show audio player with the selected episode
  };

  const handleSeasonClick = (index) => {
    // Toggle the selected season (expand or collapse)
    if (selectedSeason === index) {
      setSelectedSeason(null); // Collapse the season if it's already selected
    } else {
      setSelectedSeason(index); // Show episodes for the selected season
    }
  };

  return (
    <div>
      {loadingDetails ? (
        <p>Loading show details...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        podcast && (
          <div style={{ marginTop: '20px' }}>
            <h3>{podcast.title}</h3>
            
            {/* Display podcast preview image */}
            {podcast.image && <img src={podcast.image} alt={`${podcast.title} Preview`} style={{ width: '100%', maxWidth: '600px', margin: '20px 0' }} />}
            
            <p className="podcast-description">{podcast.description}</p> {/* Apply class for spacing */}
            <h4 className="seasons-heading">Seasons and Episodes:</h4> {/* Apply class for spacing */}
            {podcast.seasons && podcast.seasons.length > 0 ? (
              podcast.seasons.map((season, index) => (
                <div key={index} className="season-item"> {/* Apply class for spacing */}
                  <h5 
                    className="season-title" // Apply class for spacing
                    style={{ cursor: 'pointer', color: 'blue' }} 
                    onClick={() => handleSeasonClick(index)}
                  >
                    Season {index + 1}
                  </h5>
                  {selectedSeason === index && ( // Only show episodes for the selected season
                    <div className="season-episodes">
                      <ul>
                        {season.episodes && season.episodes.length > 0 ? (
                          season.episodes.map((episode) => (
                            <li key={episode.id}>
                              <strong>{episode.title}</strong>: {episode.description}
                              <button onClick={() => handleEpisodeClick(episode)}>Play Episode</button>
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








