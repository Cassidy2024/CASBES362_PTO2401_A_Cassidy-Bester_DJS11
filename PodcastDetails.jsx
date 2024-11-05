import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PodcastDetails = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [error, setError] = useState(null);

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
            <p>{podcast.description}</p>
            <h4>Seasons and Episodes:</h4>
            {podcast.seasons && podcast.seasons.length > 0 ? (
              podcast.seasons.map((season, index) => (
                <div key={index}>
                  <h5>Season {index + 1}</h5>
                  <ul>
                    {season.episodes && season.episodes.length > 0 ? (
                      season.episodes.map((episode) => (
                        <li key={episode.id}>
                          <strong>{episode.title}</strong>: {episode.description}
                        </li>
                      ))
                    ) : (
                      <p>No episodes available for this season.</p>
                    )}
                  </ul>
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
