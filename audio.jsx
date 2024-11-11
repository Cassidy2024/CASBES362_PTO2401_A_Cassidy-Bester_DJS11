import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Audio = ({ episode: propEpisode, onClose }) => {
  const location = useLocation();
  const episode = propEpisode || location.state?.episode || JSON.parse(localStorage.getItem('currentEpisode'));
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (episode) {
      localStorage.setItem('currentEpisode', JSON.stringify(episode));
      const savedTime = localStorage.getItem(`audio-timestamp-${episode.id}`);
      if (savedTime) {
        setCurrentTime(parseFloat(savedTime));
      }
    }
  }, [episode]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
      audioRef.current.play().catch((error) => console.error("Autoplay prevented:", error));
    }
  }, [currentTime]);

  useEffect(() => {
    const saveTimeInterval = setInterval(() => {
      if (audioRef.current && episode) {
        localStorage.setItem(`audio-timestamp-${episode.id}`, audioRef.current.currentTime);
      }
    }, 10000);

    return () => clearInterval(saveTimeInterval);
  }, [episode]);

  const handleCanPlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => console.error("Play prevented:", error));
    }
  };

  const handleCloseClick = () => {
    setShowConfirmation(true);
  };

  const confirmClose = () => {
    if (onClose) onClose();
    setShowConfirmation(false);
  };

  const cancelClose = () => {
    setShowConfirmation(false);
  };

  return episode ? (
    <div style={audioContainerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h4>Now Playing: {episode.title}</h4>
        <button onClick={handleCloseClick} style={{ fontSize: '1.2rem', background: 'none', border: 'none', cursor: 'pointer' }}>
          ×
        </button>
      </div>
      <p style={{ fontSize: '0.8rem' }}>{episode.description}</p>
      <audio
        ref={audioRef}
        controls
        src={episode.file || "https://podcast-api.netlify.app/placeholder-audio.mp3"}
        onCanPlay={handleCanPlay}
      >
        Your browser does not support the audio element.
      </audio>

      {showConfirmation && (
        <div style={confirmationStyle}>
          <p>Are you sure you want to close the audio player?</p>
          <button onClick={confirmClose}>Yes</button>
          <button onClick={cancelClose}>No</button>
        </div>
      )}
    </div>
  ) : null;
};

const audioContainerStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '300px',
  padding: '15px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: '8px',
  zIndex: 1000,
};

const confirmationStyle = {
  position: 'absolute',
  bottom: '50px',
  right: '20px',
  backgroundColor: 'white',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
  zIndex: 1001,
};

export default Audio;















