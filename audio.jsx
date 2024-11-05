
import React from 'react';
import { useLocation } from 'react-router-dom';

const Audio = () => {
  // Retrieve episode data from navigation (URL state or params)
  const location = useLocation();
  const episode = location.state?.episode;

  if (!episode) {
    return <p>No episode data available.</p>;
  }

  return (
    <div>
      <h2>Now Playing: {episode.title}</h2>
      <p>{episode.description}</p>
      <audio controls src={episode.audioUrl}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Audio;
