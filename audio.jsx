import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import defaultAudio from './default-audio.mp3'; // Importing the default audio

const Audio = () => {
  const location = useLocation();
  const episode = location.state?.episode;
  const navigate = useNavigate();

  const handleClose = () => {
    const confirmClose = window.confirm("Are you sure you want to close this page?");
    if (confirmClose) {
      navigate(-1); // Navigate back
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>Now Playing: {episode ? episode.title : "Default Audio"}</h2>
        <button onClick={handleClose} style={{ fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
          ×
        </button>
      </div>
      <p>{episode ? episode.description : "Default audio description."}</p>
      {/* Use default audio for playback */}
      <audio controls src={defaultAudio}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Audio;





