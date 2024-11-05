import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Audio = () => {
  // Retrieve episode data from navigation (URL state or params)
  const location = useLocation();
  const episode = location.state?.episode;
  const navigate = useNavigate(); // Initialize navigate

  // Function to handle going back to the PodcastDetails page with confirmation
  const handleClose = () => {
    const confirmClose = window.confirm("Are you sure you want to close this page?");
    if (confirmClose) {
      navigate(-1); // Takes the user back to the previous page
    }
  };

  if (!episode) {
    return <p>No episode data available.</p>;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>Now Playing: {episode.title}</h2>
        <button onClick={handleClose} style={{ fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
          ×
        </button>
      </div>
      <p>{episode.description}</p>
      <audio controls src={episode.audioUrl}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Audio;


